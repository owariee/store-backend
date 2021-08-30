import Database from './Database';
import express from 'express';

const db = new Database();
const app = express();

app.get('/', async function(req, res) {
  const col = await db.getCollection('customers');

  if(col === null) {
    res.send("Cannot connect to the database!");
    return;
  }

  const results = await col.find().toArray();
  res.send(results);
})

app.get('/connect', async function(req, res) {
  await db.connect();
  res.send(db.connected);
})

app.get('/disconnect', async function(req, res) {
  await db.disconnect();
  res.send(db.connected);
})

app.listen(3000);
