const allowedMethods = ['GET', 'POST', 'OPTIONS'];

function setCorsHeaders(res) {
  const origin = process.env.CORS_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-token');
  res.setHeader('Access-Control-Allow-Methods', allowedMethods.join(','));
}

export function withApiHandler(config, handler) {
  const { methods = ['GET'], requireAdmin = false } = config;

  return async function apiHandler(req, res) {
    setCorsHeaders(res);

    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }

    if (!methods.includes(req.method)) {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    if (requireAdmin) {
      const incomingAdminToken = req.headers['x-admin-token'];
      if (!process.env.ADMIN_TOKEN || incomingAdminToken !== process.env.ADMIN_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  };
}
