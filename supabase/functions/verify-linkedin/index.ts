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
    const { submissionId, linkedinUrl } = await req.json();

    if (!submissionId || !linkedinUrl) {
      return new Response(
        JSON.stringify({
          verified: false,
          error: "submissionId and linkedinUrl are required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    let url;

    try {
      url = new URL(linkedinUrl);
    } catch {
      return new Response(
        JSON.stringify({
          verified: false,
          error: "Invalid URL",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const hostname = url.hostname.toLowerCase();

    const validDomain =
      hostname === "linkedin.com" ||
      hostname === "www.linkedin.com";

    const validPostPath =
      url.pathname.startsWith("/posts/") ||
      url.pathname.startsWith("/feed/update/");

    const obviousDummy =
      linkedinUrl.toLowerCase().includes("/test") ||
      linkedinUrl.toLowerCase().includes("example") ||
      linkedinUrl.toLowerCase().includes("dummy");

    const verified =
      validDomain &&
      validPostPath &&
      !obviousDummy;

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey =
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey
    );

    const { error } = await supabase
      .from("submissions")
      .update({
        linkedin_verified: verified,
      })
      .eq("id", submissionId);

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        verified,
        linkedinUrl,
      }),
      {
        status: 200,
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
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});