import crypto from 'node:crypto';
import UserRepository from '../../application/repository/UserRepository';
import User from '../../domain/entity/User';
import Connection from '../database/Connection';

export default class UserDatabaseRepository implements UserRepository {
  constructor (readonly connection: Connection) {}

  async getByUsername(username: string): Promise<User> {
    const [user] = await this.connection.query<User>('SELECT * FROM ng.users WHERE username = $1', [username])
    return new User(user.username, user.password);
  }

  async register(user: User): Promise<void> {
    const accountId = crypto.randomUUID();
    await this.connection.query('INSERT INTO ng.accounts (id, balance) VALUES ($1, $2)', [accountId, 100.00]);
    await this.connection.query('INSERT INTO ng.users (id, username, password, accountId) VALUES ($1, $2, $3, $4)', [
      crypto.randomUUID(),
      user.username,
      user.password,
      accountId
    ]);
  }
}