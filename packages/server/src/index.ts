import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { join } from 'path';
import { Constants, Log } from '@pardes/common';
import { createServer } from 'http';
import * as bible from './net.json';

const PORT = Number(process.env.PORT || Constants.PORT);
const PUBLIC_DIR = join(__dirname, Constants.PUBLIC_PATH_TO_CLIENT);

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(express.static(PUBLIC_DIR));

Object.keys(bible).forEach(function(book) {
  app.get(`/${book}`, (req: any, res: any) => {
    return bible[book] !== undefined ? res.send(bible[book]) : res.status(404).send(`'${book}' does not exist.`)
  })

  Object.keys(bible[book]).forEach(function(chapter) {
    app.get(`/${book}/${chapter}`, (req: any, res: any) => {
      return bible[book][chapter] !== undefined ? res.send(bible[book][chapter]) : res.status(404).send(`'${book} ${chapter}' does not exist.`)
    })

    Object.keys(bible[book][chapter]).forEach(function(verse) {
      app.get(`/${book}/${chapter}/${verse}`, (req: any, res: any) => {
        return bible[book][chapter][verse] !== undefined ? res.send(bible[book][chapter][verse]) : res.status(404).send(`'${book} ${chapter}:${verse}' does not exist.`)
      })
    })
  })
})

app.get('/', (req: any, res: any) => {
  res.sendFile(join(PUBLIC_DIR, 'index.html'));
});

app.get('*', (req: any, res: any) => {
  res.status(404).send('Route does not exist.');
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
