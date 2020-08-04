import express from 'express';
import router from './routes/accounts.js';
import winston from 'winston';
import { promises as fs } from 'fs'; //  import fs from "fs";
const { readFile, writeFile } = fs;
const app = express();
app.use(express.json());
const port = 3000;
global.filename = 'accounts.json';
const { combine, printf, label, timestamp } = winston.format;
const myformat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${[label]} ${level} : ${message}`;
});
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: ' my-bank-api.log' }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myformat),
});
app.use('/account', router); // asociar la ruta a la instacia de express
app.listen(port, async () => {
  try {
    await readFile(global.filename);
    logger.info('API Started!');
  } catch (err) {
    const initialJasom = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.filename, JSON.stringify(initialJasom))
      .then(() => {
        logger.info('API Started and file created!');
      })
      .catch((err) => {
        logger.error(err);
      });
  }
});
