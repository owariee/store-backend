import Customer from './Customer';
import Database from './Database';

import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = new Database();

Customer(app, db);

app.listen(process.env.EXPRESS_PORT);
