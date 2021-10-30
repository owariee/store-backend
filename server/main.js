import Customer from './Customer';

import dotenv from 'dotenv';
import express from 'express';
import { MongoClient } from 'mongodb';

dotenv.config();

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/';
const dbName = process.env.DB_NAME || 'store';
const port = process.env.PORT || 3000;

MongoClient.connect(dbUrl).then(client => {
  const app = express();
  const db = client.db(dbName);
  const server = app.listen(port);
  
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  Customer(app, db);
}).catch((err) => {
  console.error(`Cannot connect to the database!${err}`);
});
//.finally(() => client.close());
