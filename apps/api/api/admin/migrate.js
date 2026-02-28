import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { withApiHandler } from '../../lib/handler.js';

const run = promisify(execFile);

async function migrateHandler(_req, res) {
  const { stdout, stderr } = await run('npx', ['prisma', 'migrate', 'deploy']);

  return res.status(200).json({
    success: true,
    stdout,
    stderr
  });
}

export default withApiHandler({ methods: ['POST'], requireAdmin: true }, migrateHandler);
