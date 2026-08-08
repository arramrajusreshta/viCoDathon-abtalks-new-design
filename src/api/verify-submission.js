// api/verify-submission.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { githubUrl, linkedinUrl, githubUsername } = req.body;

  if (!githubUrl || !linkedinUrl) {
    return res.status(400).json({
      success: false,
      message: 'Both GitHub commit/PR proof and LinkedIn post links are required.',
    });
  }

  try {
    // -------------------------------------------------------------
    // 1. PREMIUM GITHUB REST API VERIFICATION
    // -------------------------------------------------------------
    // Regex matches commits, pull requests, or branch heads
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/([^\/]+)\/([^\/]+)\/(commit|pull)\/([a-zA-Z0-9_\.-]+)/i;
    const ghMatch = githubUrl.trim().match(githubRegex);

    if (!ghMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid GitHub URL. Must be a direct Commit link (e.g., github.com/user/repo/commit/hash) or Pull Request.',
      });
    }

    const [, , owner, repo, type, identifier] = ghMatch;
    const cleanRepo = repo.replace(/\.git$/, '');

    // Strict Check: User handle match
    if (githubUsername && owner.toLowerCase() !== githubUsername.toLowerCase()) {
      return res.status(400).json({
        success: false,
        message: `Repository belongs to '${owner}', but your account is linked to '${githubUsername}'.`,
      });
    }

    // Call GitHub API for explicit commit/PR verification
    const apiEndpoint = type === 'commit' 
      ? `https://api.github.com/repos/${owner}/${cleanRepo}/commits/${identifier}`
      : `https://api.github.com/repos/${owner}/${cleanRepo}/pulls/${identifier}`;

    const ghResponse = await fetch(apiEndpoint, {
      headers: {
        'User-Agent': 'ABTalks-Platform-Verifier',
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
    });

    if (ghResponse.status === 404) {
      return res.status(400).json({
        success: false,
        message: 'GitHub Commit/PR not found. Ensure repository is Public.',
      });
    }

    if (!ghResponse.ok) {
      return res.status(400).json({
        success: false,
        message: 'GitHub API verification failed. Please check link validity.',
      });
    }

    const ghData = await ghResponse.json();

    // Verification check: ensure commit is recent (within 48 hrs)
    const commitDateStr = ghData.commit?.committer?.date || ghData.created_at;
    if (commitDateStr) {
      const commitDate = new Date(commitDateStr);
      const now = new Date();
      const diffHours = Math.abs(now - commitDate) / 36e5;
      if (diffHours > 48) {
        return res.status(400).json({
          success: false,
          message: 'Commit/PR is older than 48 hours. Proof must be from today.',
        });
      }
    }

    // -------------------------------------------------------------
    // 2. PREMIUM LINKEDIN VERIFICATION
    // -------------------------------------------------------------
    // Reject url shorteners or non-post links
    const blocklist = ['bit.ly', 'tinyurl.com', 'buff.ly', 'linktr.ee'];
    if (blocklist.some(domain => linkedinUrl.toLowerCase().includes(domain))) {
      return res.status(400).json({
        success: false,
        message: 'URL shorteners are not allowed for LinkedIn proof.',
      });
    }

    // Direct post regex with activity ID match
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/(posts|feed\/update|embed\/feed\/update|pulse)\/([a-zA-Z0-9_:-]+)/i;
    if (!linkedinRegex.test(linkedinUrl.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid LinkedIn post link. Must be a direct post update URL.',
      });
    }

    return res.status(200).json({
      success: true,
      verified: true,
      message: 'Proof verified and validated against GitHub API!',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal verifier error. Please try again.',
    });
  }
}