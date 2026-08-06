// Vercel Serverless Function: Real-Time Global Stock API
// Endpoint: /api/stock

let memoryStore = {
  1: 0,
  2: 0
};

export default async function handler(req, res) {
  // Enable CORS headers so any mobile device can connect
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (body && body.deductions) {
        memoryStore = {
          ...memoryStore,
          ...body.deductions
        };
      }
      return res.status(200).json({ success: true, deductions: memoryStore });
    } catch (e) {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }
  }

  // Default GET request: return current deductions
  return res.status(200).json({ success: true, deductions: memoryStore });
}
