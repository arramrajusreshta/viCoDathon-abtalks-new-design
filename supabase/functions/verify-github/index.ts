import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
  return new Response("ok", {
    headers: corsHeaders,
  });
}
  try {
    const { submissionId, githubUrl } = await req.json();

    if (!submissionId || !githubUrl) {
      return new Response(
        JSON.stringify({ error: "submissionId and githubUrl are required" }),
        { status: 400 }
      );
    }

    const match = githubUrl.match(
      /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/commit\/([a-fA-F0-9]+)/
    );

    if (!match) {
      return new Response(
        JSON.stringify({
          verified: false,
          error: "Invalid GitHub commit URL",
        }),
        { status: 400 }
      );
    }

    const [, owner, repo, sha] = match;

    const githubToken = Deno.env.get("GITHUB_TOKEN");

    const githubResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits/${sha}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(githubToken
            ? { Authorization: `Bearer ${githubToken}` }
            : {}),
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    const verified = githubResponse.ok;

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey
    );

    const { error } = await supabase
      .from("submissions")
      .update({
        github_verified: verified,
        verified_at: verified ? new Date().toISOString() : null,
      })
      .eq("id", submissionId);

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        verified,
        owner,
        repo,
        sha,
      }),
      {
        headers: {
  ...corsHeaders,
  "Content-Type": "application/json",
},
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      }),
      { status: 500 }
    );
  }
});