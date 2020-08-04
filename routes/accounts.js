import express from 'express';
import { promises as fs } from 'fs'; //  import fs from "fs";
import winston from 'winston';
const { readFile, writeFile } = fs;
const router = express.Router();
router.post('/', async (req, res, next) => {
  try {
    let account = req.body;
    if (!account.name || account.balance == null) {
      throw new Error('Name e balance são obrigatorios');
    }
    const data = JSON.parse(await readFile(global.filename));
    account = {
      id: data.nextId++,
      name: account.name,
      balance: data.balance,
    };
    data.accounts.push(account);
    await writeFile(global.filename, JSON.stringify(data));
    res.send(account);
    logger.info(`POST /account ${JSON.stringify(ccount)}`);
  } catch (err) {
    next(err);
  }
});
router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    delete data.nextId;
    res.send(data);
    logger.info(`GET /account`);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );
    res.send(account);
    logger.info(`GET /account/id `);
  } catch (err) {
    next(err);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );
    await writeFile(global.filename, JSON.stringify(data));
    res.send(account);
    logger.info(`DELETE /account/: id${req.params.id} `);
  } catch (err) {
    next(err);
  }
});
// actualizacion de recurso (cuenta) completa
router.put('/', async (req, res, next) => {
  try {
    const account = req.body;
    if (!account.id || !account.name || account.balance == null) {
      throw new Error('Id, Name e balance são obrigatorios');
    }
    const data = JSON.parse(await readFile(global.filename));
    const index = data.accounts.findIndex((a) => a.id === account.id);
    if (index === -1) {
      throw new Error('Registro no encontrado');
    }
    data.accounts[index].name = accounts.name;
    data.accounts[index].balance = accounts.balance;
    await writeFile(global.filename, JSON.stringify(data));
    res.send(account);
    logger.info(`PUT /account ${JSON.stringify(ccount)}`);
  } catch (err) {
    next(err);
  }
});
//actualizacion de recurso (cuenta) parcial
router.patch('/updateBalance', async (req, res, next) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(global.filename));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    if (!account.id || account.balance == null) {
      throw new Error('Id e balance são obrigatorios');
    }
    if (index === -1) {
      throw new Error('Registro no encontrado');
    }

    data.accounts[index].balance = accounts.balance;
    await writeFile(global.filename, JSON.stringify(data));
    res.send(data.accounts.index);
    logger.info(`PUT /account/updateBalance ${JSON.stringify(ccount)}`);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(`${err.message}`);
  //res.status(400).send({ error: err.message });
});
export default router;
