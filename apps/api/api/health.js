import { withApiHandler } from '../lib/handler.js';

async function healthHandler(_req, res) {
  return res.status(200).json({ status: 'ok' });
}

export default withApiHandler({ methods: ['GET'] }, healthHandler);
