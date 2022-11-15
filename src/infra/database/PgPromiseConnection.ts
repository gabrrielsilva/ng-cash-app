import pgp from 'pg-promise';
import pg from 'pg-promise/typescript/pg-subset';
import Connection from './Connection';

export default class PgPromiseConnection implements Connection {
  connection: pgp.IDatabase<{}, pg.IClient>;

  constructor () {
    this.connection = pgp()('postgres://gabriel:admin@0.0.0.0:5432/ngcash');
  }

  async query (statement: string, params: any) {
    return this.connection.query(statement, params);
  }

  async close () {
    return this.connection.$pool.end();
  }
}