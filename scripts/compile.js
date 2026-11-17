// Merges every projects/<id>/knowledge.json and NOTES.md into compiled/knowledge.json and compiled/KNOWLEDGE.md.
// Run by the Compile action after any change in projects/; no dependencies (node scripts/compile.js).
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const projectsDir = path.join(root, "projects");
const outDir = path.join(root, "compiled");

const projects = fs.existsSync(projectsDir)
  ? fs.readdirSync(projectsDir).filter(d => fs.existsSync(path.join(projectsDir, d, "knowledge.json"))).sort()
  : [];

const sprites = new Map();   // fingerprint → { w, h, names{}, roles{}, projects[] }
const panels = new Map();    // fingerprint → { w, h, files{}, screens{}, projects[] }
const screens = new Map();   // screen key → { names{}, kinds{}, projects[], template, latest }
const notes = new Map();     // lower-case text → { text, projects[] }

const key = s => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
const vote = (bag, v) => { if (v) bag[v] = (bag[v] || 0) + 1; };
const top = bag => Object.entries(bag).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
const add = (list, v) => { if (!list.includes(v)) list.push(v); };

for (const id of projects) {
  let k;
  try { k = JSON.parse(fs.readFileSync(path.join(projectsDir, id, "knowledge.json"), "utf8")); }
  catch (e) { console.warn(`skip ${id}: ${e.message}`); continue; }

  for (const s of k.sprites || []) {
    if (!s.hash) continue;
    const e = sprites.get(s.hash) || { w: s.w, h: s.h, names: {}, roles: {}, projects: [] };
    if (s.name && !/_\d+b?$/.test(s.name)) vote(e.names, s.name);   // numbered names (atlas-1_12) say nothing
    vote(e.roles, s.role);
    add(e.projects, id);
    sprites.set(s.hash, e);
  }

  for (const p of k.panels || []) {
    if (!p.hash) continue;
    const e = panels.get(p.hash) || { w: p.w, h: p.h, files: {}, screens: {}, projects: [] };
    vote(e.files, p.file);
    vote(e.screens, p.screen);
    add(e.projects, id);
    panels.set(p.hash, e);
  }

  for (const s of k.screens || []) {
    const sk = key(s.name);
    if (!sk) continue;
    const e = screens.get(sk) || { names: {}, kinds: {}, projects: [], template: null, latest: "" };
    vote(e.names, s.name);
    vote(e.kinds, s.kind);
    add(e.projects, id);
    // The most recent project's version of the screen is its template.
    if ((k.updated || "") >= e.latest) { e.latest = k.updated || ""; e.template = { from: id, size: s.size, dim: s.dim, elements: s.elements || [] }; }
    screens.set(sk, e);
  }

  const md = path.join(projectsDir, id, "NOTES.md");
  if (fs.existsSync(md))
    for (const line of fs.readFileSync(md, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*[-*]\s+(.+)$/);
      if (!m) continue;
      const nk = m[1].trim().toLowerCase();
      const e = notes.get(nk) || { text: m[1].trim(), projects: [] };
      add(e.projects, id);
      notes.set(nk, e);
    }
}

const compiled = {
  schema: 1,
  built: new Date().toISOString(),
  projects,
  sprites: [...sprites].map(([hash, e]) => ({ hash, w: e.w, h: e.h, name: top(e.names), role: top(e.roles), seen: e.projects.length })),
  panels: [...panels].map(([hash, e]) => ({ hash, w: e.w, h: e.h, file: top(e.files), screen: top(e.screens), seen: e.projects.length })),
  screens: [...screens].map(([k2, e]) => ({ key: k2, name: top(e.names), kind: top(e.kinds), seen: e.projects.length, template: e.template }))
    .sort((a, b) => b.seen - a.seen),
  notes: [...notes.values()].map(n => ({ text: n.text, seen: n.projects.length })).sort((a, b) => b.seen - a.seen),
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "knowledge.json"), JSON.stringify(compiled, null, 2) + "\n");

const lines = [
  "# GameBuilder Knowledge (compiled)",
  "",
  `Built from ${projects.length} project(s): ${projects.join(", ") || "none yet"}.`,
  "",
  "## Lessons (most often seen first)",
  ...(compiled.notes.length ? compiled.notes.map(n => `- ${n.text}${n.seen > 1 ? ` _(${n.seen} projects)_` : ""}`) : ["- none yet"]),
  "",
  "## Screens seen",
  ...(compiled.screens.length ? compiled.screens.map(s => `- **${s.name}** (${s.kind || "screen"}), ${s.seen} project(s), ${s.template?.elements?.length || 0} elements in the latest layout`) : ["- none yet"]),
  "",
  "## Panels (whole images) and the screens they went on",
  ...(compiled.panels.length ? compiled.panels.map(p => `- ${p.file} (${p.w}×${p.h}) → ${p.screen || "unused"}`) : ["- none yet"]),
  "",
  `Sprites known by fingerprint: ${compiled.sprites.length} (${compiled.sprites.filter(s => s.name).length} with a name).`,
  "",
];
fs.writeFileSync(path.join(outDir, "KNOWLEDGE.md"), lines.join("\n"));
console.log(`compiled ${projects.length} project(s): ${compiled.sprites.length} sprites, ${compiled.panels.length} panels, ${compiled.screens.length} screens, ${compiled.notes.length} notes`);
