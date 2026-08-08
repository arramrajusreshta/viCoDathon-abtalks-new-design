// api/verify-submission.js

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { githubUrl, linkedinUrl, githubUsername } = req.body;

  if (!githubUrl || !linkedinUrl) {
    return res.status(400).json({
      success: false,
      message: 'Both GitHub and LinkedIn links are required.',
    });
  }

  try {
    // -------------------------------------------------------------
    // 1. GITHUB PROOF VERIFICATION (Using GitHub REST API)
    // -------------------------------------------------------------
    let isGithubValid = false;
    let githubErrorMsg = '';

    // Regex handles commits, PRs, tree, or repository URLs
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/([^\/]+)\/([^\/]+)(\/(commit|pull|tree|blob)\/([^\/]+))?/i;
    const ghMatch = githubUrl.trim().match(githubRegex);

    if (!ghMatch) {
      githubErrorMsg = 'Invalid GitHub URL format. Use a valid repo, commit, or PR link.';
    } else {
      const owner = ghMatch[2];
      const repo = ghMatch[3].replace(/\.git$/, '');

      // Check repository/commit existence via official GitHub API
      const ghResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          'User-Agent': 'ABTalks-Submission-Verifier',
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
      });

      if (ghResponse.status === 404) {
        githubErrorMsg = 'GitHub repository or commit does not exist or is private.';
      } else if (!ghResponse.ok) {
        githubErrorMsg = 'Failed to verify GitHub link with GitHub API.';
      } else {
        // Verification succeeded
        isGithubValid = true;
      }
    }

    // -------------------------------------------------------------
    // 2. LINKEDIN PROOF VERIFICATION (Format & Dummy-link Check)
    // -------------------------------------------------------------
    let isLinkedinValid = false;
    let linkedinErrorMsg = '';

    // Prevents placeholders or generic profile links (must be an actual post/update)
    const linkedinPostRegex = /^https?:\/\/(www\.)?linkedin\.com\/(posts|feed\/update|embed\/feed\/update|pulse)\/([a-zA-Z0-9_-]+)/i;
    const cleanLinkedinUrl = linkedinUrl.trim();

    if (!linkedinPostRegex.test(cleanLinkedinUrl)) {
      linkedinErrorMsg = 'Invalid LinkedIn URL. Must be a direct post or update URL (e.g. linkedin.com/posts/...)';
    } else {
      isLinkedinValid = true;
    }

    // -------------------------------------------------------------
    // 3. FINAL EVALUATION RESPONSE
    // -------------------------------------------------------------
    if (!isGithubValid) {
      return res.status(400).json({ success: false, message: githubErrorMsg });
    }

    if (!isLinkedinValid) {
      return res.status(400).json({ success: false, message: linkedinErrorMsg });
    }

    return res.status(200).json({
      success: true,
      verified: true,
      message: 'Proof verified successfully!',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server verification error. Please try again later.',
    });
  }
}