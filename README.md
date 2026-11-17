# GameBuilder Knowledge

What the GameBuilder tools learn from each project, so the next project needs less work. No art and no assets are stored here: only names, text, sizes, positions and image fingerprints (a few numbers per image that cannot be turned back into the image).

```
projects/<project-id>/knowledge.json   one project's data, written by UI Builder (through the relay)
projects/<project-id>/NOTES.md         what was learned in that project, in plain words
compiled/knowledge.json                every project merged (built by the GitHub Action)
compiled/KNOWLEDGE.md                  the merged notes and the patterns seen most often
scripts/compile.js                     the merge
relay/worker.js                        the Cloudflare Worker that writes a project's files (holds the GitHub token)
```

- **Reading** needs no login: UI Builder downloads `compiled/` from this public repo.
- **Writing** goes through the relay: UI Builder sends a project's data to it, and it writes only `projects/<project-id>/`. The GitHub token lives only in the relay (as a Cloudflare secret), never in the tool or here.
- After every change in `projects/`, the **Compile** action rebuilds `compiled/`.

## Relay setup (Cloudflare Workers, free plan)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Create Worker** → name it `gamebuilder-knowledge` → **Deploy**.
2. **Edit code** → replace everything with `relay/worker.js` from this repo → **Deploy**.
3. Worker → **Settings** → **Variables and Secrets** → **Add**:
   - Type **Secret**, name `GITHUB_TOKEN`, value: the fine-grained token (only this repo, Contents: Read and write).
   - Type **Text**, name `REPO`, value: `abrarahmad-star/GameBuilder-Knowledge`.
4. Copy the worker's address (`https://gamebuilder-knowledge.<your-subdomain>.workers.dev`) into UI Builder's Settings → Knowledge Relay URL.
