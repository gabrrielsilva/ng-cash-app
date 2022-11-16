import * as dotenv from 'dotenv';
import pgp from 'pg-promise';
import pg from 'pg-promise/typescript/pg-subset';
import Connection from './Connection';
dotenv.config();

export default class PgPromiseConnection implements Connection {
  connection: pgp.IDatabase<{}, pg.IClient>;

  constructor () {    
    this.connection = pgp()(process.env.DATABASE_URL as string);
  }

  async query (statement: string, params: any) {
    return this.connection.query(statement, params);
  }

  async close () {
    return this.connection.$pool.end();
  }
}