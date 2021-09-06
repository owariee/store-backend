import Customer from './Customer';
import Database from './Database';

import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const db = new Database();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

Customer(app, db);

app.listen(process.env.EXPRESS_PORT);
