// Cloudflare Worker: keeps your Gemini key secret. Use this before sharing the app publicly.
// Set secrets in Cloudflare: GEMINI_API_KEY, and a variable ALLOWED_ORIGIN (e.g. https://yourname.github.io)
export default {
  async fetch(req, env) {
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST" || req.headers.get("Origin") !== env.ALLOWED_ORIGIN)
      return new Response("Not allowed", { status: 403, headers: cors });
    const body = await req.text();
    if (body.length > 20000) return new Response("Too large", { status: 413, headers: cors });
    const model = env.MODEL || "gemini-2.5-flash";
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`,
      { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY }, body }
    );
    return new Response(r.body, { status: r.status, headers: { ...cors, "Content-Type": "text/event-stream" } });
  }
};
