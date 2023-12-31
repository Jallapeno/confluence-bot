import express from 'express';
import { handle } from './src/app.js';

const app = express();
const port = 9888;

;(async () => {
  const server = app.listen(port, () => {
    handle()
  });

  server.on('error', (error) => {
    console.error('Error to start server:', error);
  });
})()
