export default async function handler(req, res) {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const targetUrl = req.query.url || req.headers['x-target-url'];
  if (!targetUrl) return res.status(400).json({ error: 'Missing ?url= parameter' });

  try {
    const parsed = new URL(targetUrl);
    if (!parsed.hostname.endsWith('telematics.guru')) {
      return res.status(403).json({ error: 'Only telematics.guru allowed' });
    }
  } catch { return res.status(400).json({ error: 'Invalid URL' }); }

  try {
    const headers = {};
    if (req.headers['content-type']) headers['Content-Type'] = req.headers['content-type'];
    if (req.headers['authorization']) headers['Authorization'] = req.headers['authorization'];

    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, { method: req.method, headers, body });
    const data = await response.text();
    res.status(response.status).setHeader('Content-Type', response.headers.get('content-type') || 'application/json').send(data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
}
