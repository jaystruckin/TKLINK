// TKLINK CORS Proxy — Cloudflare Pages Function
// Automatically works when deployed to Cloudflare Pages

export async function onRequest(context) {
  const { request } = context;

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(request) });
  }

  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');
  if (!targetUrl) {
    return json({ error: 'Missing ?url= parameter' }, 400, request);
  }

  // Only allow telematics.guru domains
  try {
    const parsed = new URL(targetUrl);
    if (!parsed.hostname.endsWith('telematics.guru')) {
      return json({ error: 'Only telematics.guru allowed' }, 403, request);
    }
  } catch {
    return json({ error: 'Invalid URL' }, 400, request);
  }

  // Forward the request
  const proxyHeaders = new Headers();
  if (request.headers.get('Content-Type')) proxyHeaders.set('Content-Type', request.headers.get('Content-Type'));
  if (request.headers.get('Authorization')) proxyHeaders.set('Authorization', request.headers.get('Authorization'));

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: proxyHeaders,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.text(),
    });

    const body = await response.text();
    return new Response(body, {
      status: response.status,
      headers: {
        ...corsHeaders(request),
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (err) {
    return json({ error: err.message }, 502, request);
  }
}

function json(data, status, request) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(request), 'Content-Type': 'application/json' },
  });
}

const ALLOWED_ORIGINS = [
  'https://jaystruckin.github.io',
  'https://tklink.pages.dev',
];

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const isAllowed = ALLOWED_ORIGINS.includes(origin)
    || /^https:\/\/[a-z0-9-]+\.pages\.dev$/.test(origin)
    || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}
