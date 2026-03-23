const http = require('http');
const https = require('https');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || '*';

function proxyRequest(targetUrl, options, body) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(targetUrl);
    const mod = parsed.protocol === 'https:' ? https : http;

    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method: options.method || 'GET',
      headers: { ...options.headers },
    };

    // Remove browser-specific headers
    delete reqOptions.headers['host'];
    delete reqOptions.headers['origin'];
    delete reqOptions.headers['referer'];

    const req = mod.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, body: data });
      });
    });

    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (body) req.write(body);
    req.end();
  });
}

function setCorsHeaders(res, origin) {
  const allowed = ALLOWED_ORIGINS.split(',').map((s) => s.trim());
  if (allowed.includes('*') || allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  } else {
    res.setHeader('Access-Control-Allow-Origin', allowed[0]);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Target-URL');
  res.setHeader('Access-Control-Max-Age', '86400');
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers['origin'] || '';
  setCorsHeaders(res, origin);

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check
  if (req.url === '/' || req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'tklink-proxy' }));
    return;
  }

  // Proxy endpoint: /proxy
  if (req.url.startsWith('/proxy')) {
    const targetUrl = req.headers['x-target-url'];

    if (!targetUrl) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing X-Target-URL header' }));
      return;
    }

    // Validate URL and restrict to Telematics Guru domains only
    try {
      const parsed = new URL(targetUrl);
      if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Bad protocol');
      if (!parsed.hostname.endsWith('.telematics.guru') && parsed.hostname !== 'telematics.guru') {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Only telematics.guru domains are allowed' }));
        return;
      }
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid target URL' }));
      return;
    }

    // Read request body
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const proxyHeaders = {};
        if (req.headers['content-type']) proxyHeaders['Content-Type'] = req.headers['content-type'];
        if (req.headers['authorization']) proxyHeaders['Authorization'] = req.headers['authorization'];

        const result = await proxyRequest(targetUrl, {
          method: req.method,
          headers: proxyHeaders,
        }, body || undefined);

        // Forward content-type from target
        const contentType = result.headers['content-type'] || 'application/json';
        res.writeHead(result.status, { 'Content-Type': contentType });
        res.end(result.body);
      } catch (err) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Proxy error', message: err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`TKLINK proxy running on port ${PORT}`);
});
