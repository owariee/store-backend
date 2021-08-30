import { MongoClient } from 'mongodb';
import 'dotenv/config';

class Database {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URL);
    this.connected = false;
    this.connect();
    this.setSchema();
  }

  async connect() {
    let error = false;
    if(!this.connected) {
      await this.client.connect()
        .then(() => {this.connected = true})
        .catch(() => {error = true});
    }
    return !error;
  }

  async disconnect() {
    if(this.connected) {
      this.client.close()
        .then(() => {this.connected = false});
    }
  }

  setSchema(name = process.env.MONGO_SCHEMA) {
    this.schema = name;
  }

  async getCollection(name) {
    if(!await this.connect()) {
      return null;
    }

    return this.client.db(this.schema).collection(name);
  }
}

export default Database;
