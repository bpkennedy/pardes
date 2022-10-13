import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { join } from 'path';
import { Constants, Log } from '@pardes/common';
import { createServer } from 'http';

const PORT = Number(process.env.PORT || Constants.PORT);
const PUBLIC_DIR = join(__dirname, Constants.PUBLIC_PATH_TO_CLIENT);

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(express.static(PUBLIC_DIR));

app.get('*', (req: any, res: any) => {
  res.sendFile(join(PUBLIC_DIR, 'index.html'));
});

server.listen(PORT, async () => {
  Log.info(`Listening on localhost:${PORT}`);
})

process.on('SIGTERM', () => {
  Log.info(`Graceful termination...`);
  process.exit(1);
})

process.on('SIGINT', () => {
  Log.info(`Graceful interruption...`);
  process.exit(0);
})
