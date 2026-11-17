// GameBuilder Knowledge relay (Cloudflare Worker).
// UI Builder posts one project's knowledge here; this writes it to projects/<id>/ in the knowledge repo.
// Secrets/vars (Worker → Settings → Variables and Secrets):
//   GITHUB_TOKEN  secret: fine-grained token, only the knowledge repo, Contents: Read and write
//   REPO          text:   owner/name of the knowledge repo
//
// POST /submit  { "id": "my-game-1a2b", "knowledge": { "schema": 1, ... }, "notes": "markdown" }

const MAX_JSON = 512 * 1024;   // bytes of knowledge.json
const MAX_NOTES = 64 * 1024;   // bytes of NOTES.md

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "GET") return reply(200, { ok: true, service: "gamebuilder-knowledge" });
    if (request.method !== "POST" || url.pathname !== "/submit") return reply(404, { error: "POST /submit only" });

    let body;
    try { body = await request.json(); } catch { return reply(400, { error: "body is not JSON" }); }

    // Checks: a safe folder name, the expected shape, size limits, and no embedded images.
    const id = String(body.id || "");
    if (!/^[a-z0-9][a-z0-9-]{2,63}$/.test(id)) return reply(400, { error: "id: 3-64 chars, a-z 0-9 and -" });
    const k = body.knowledge;
    if (!k || typeof k !== "object" || k.schema !== 1) return reply(400, { error: "knowledge.schema must be 1" });
    const json = JSON.stringify(k, null, 2);
    const notes = String(body.notes || "");
    if (json.length > MAX_JSON || notes.length > MAX_NOTES) return reply(413, { error: "too big" });
    if (/data:image|iVBORw0KGgo|\/9j\/4AAQ/.test(json + notes)) return reply(400, { error: "images are not allowed" });

    try {
      await put(env, `projects/${id}/knowledge.json`, json + "\n", `Knowledge: ${id}`);
      await put(env, `projects/${id}/NOTES.md`, notes.endsWith("\n") ? notes : notes + "\n", `Notes: ${id}`);
    } catch (e) {
      return reply(502, { error: String(e.message || e) });
    }
    return reply(200, { ok: true, path: `projects/${id}/` });
  },
};

// Creates or replaces one file through the GitHub contents API. Only paths under projects/ ever get here.
async function put(env, path, text, message) {
  if (!path.startsWith("projects/")) throw new Error("refused path " + path);
  const api = `https://api.github.com/repos/${env.REPO}/contents/${path}`;
  const headers = {
    "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
    "Accept": "application/vnd.github+json",
    "User-Agent": "gamebuilder-knowledge-relay",
  };
  const content = btoa(unescape(encodeURIComponent(text)));   // UTF-8 → base64
  const current = await fetch(api, { headers });
  let sha;
  if (current.ok) {
    const file = await current.json();
    if ((file.content || "").replace(/\n/g, "") === content) return;   // unchanged: no empty commit
    sha = file.sha;
  }
  const res = await fetch(api, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ message, content, sha }),
  });
  if (!res.ok) throw new Error(`GitHub ${res.status} on ${path}`);
}

function reply(status, data) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}
