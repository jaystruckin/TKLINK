// TKLINK CORS Proxy — Netlify Function
// Automatically works when deployed to Netlify

export default async function handler(req) {
  const origin = req.headers.get('origin') || '*';
  const cors = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  const url = new URL(req.url);
  const targetUrl = url.searchParams.get('url');
  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Missing ?url= parameter' }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  // Only allow telematics.guru domains
  try {
    const parsed = new URL(targetUrl);
    if (!parsed.hostname.endsWith('telematics.guru')) {
      return new Response(JSON.stringify({ error: 'Only telematics.guru allowed' }), {
        status: 403,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid URL' }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  // Forward the request
  const proxyHeaders = {};
  if (req.headers.get('content-type')) proxyHeaders['Content-Type'] = req.headers.get('content-type');
  if (req.headers.get('authorization')) proxyHeaders['Authorization'] = req.headers.get('authorization');

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: proxyHeaders,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : await req.text(),
    });

    const body = await response.text();
    return new Response(body, {
      status: response.status,
      headers: {
        ...cors,
        'Content-Type': response.headers.get('content-type') || 'application/json',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 502,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }
}

export const config = { path: '/api/proxy' };
