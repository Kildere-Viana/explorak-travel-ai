import http from 'node:http';
import { dispatch } from './app.js';
const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  try {
    let raw = ''; let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 65536) { res.writeHead(413); res.end(JSON.stringify({ error: 'Corpo muito grande' })); return; }
      raw += chunk;
    }
    let body = {};
    try { if (raw) body = JSON.parse(raw); }
    catch { res.writeHead(400); res.end(JSON.stringify({ error: 'JSON inválido' })); return; }
    const result = await dispatch(req.method, new URL(req.url, 'http://localhost').pathname, body);
    res.writeHead(result.status); res.end(JSON.stringify(result.data));
  } catch { res.writeHead(500); res.end(JSON.stringify({ error: 'Erro interno' })); }
});
server.listen(Number(process.env.PORT ?? 3000), '127.0.0.1', () => console.log('ExploraK Travel AI disponível localmente'));
