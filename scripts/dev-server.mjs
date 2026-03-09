import { createReadStream, existsSync, readFileSync, statSync, watch } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const ROOT = process.cwd();
const PORT = Number(process.env.PORT || 4173);
const WATCH_PATHS = ["index.html", "src", "public", "style.css"];

const MIME = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

const clients = new Set();

function injectLiveReload(html) {
  const snippet = `<script>
(() => {
  const es = new EventSource('/__live_reload');
  es.onmessage = () => window.location.reload();
})();
</script>`;

  if (html.includes("</body>")) return html.replace("</body>", `${snippet}</body>`);
  return `${html}\n${snippet}`;
}

function safePath(urlPath) {
  const raw = urlPath.split("?")[0];
  const clean = raw === "/" ? "/index.html" : raw;
  const normalized = normalize(clean).replace(/^(\.\.(\/|\\|$))+/, "");
  const file = resolve(ROOT, `.${normalized}`);
  if (!file.startsWith(ROOT)) return null;
  return file;
}

const server = createServer((req, res) => {
  if (!req.url) {
    res.writeHead(400);
    res.end("Bad request");
    return;
  }

  if (req.url.startsWith("/__live_reload")) {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });
    res.write("retry: 250\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  const filePath = safePath(req.url);
  if (!filePath || !existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const stats = statSync(filePath);
  if (stats.isDirectory()) {
    const indexPath = join(filePath, "index.html");
    if (!existsSync(indexPath)) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const html = readFileSync(indexPath, "utf8");
    res.writeHead(200, { "Content-Type": MIME[".html"] });
    res.end(injectLiveReload(html));
    return;
  }

  const ext = extname(filePath).toLowerCase();
  if (ext === ".html") {
    const html = readFileSync(filePath, "utf8");
    res.writeHead(200, { "Content-Type": MIME[".html"] });
    res.end(injectLiveReload(html));
    return;
  }

  res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
  createReadStream(filePath).pipe(res);
});

function broadcastReload() {
  for (const client of clients) {
    client.write(`data: reload ${Date.now()}\n\n`);
  }
}

for (const relPath of WATCH_PATHS) {
  const absPath = resolve(ROOT, relPath);
  if (!existsSync(absPath)) continue;
  watch(absPath, { recursive: true }, () => broadcastReload());
}

server.listen(PORT, () => {
  console.log(`Dev server with live reload on http://localhost:${PORT}/`);
});
