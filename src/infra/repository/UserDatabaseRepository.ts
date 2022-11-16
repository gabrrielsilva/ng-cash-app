import UserRepository from '../../application/repository/UserRepository';
import AccountGenerator from '../../domain/entity/AccountGenerator';
import User from '../../domain/entity/User';
import Connection from '../database/Connection';

export default class UserDatabaseRepository implements UserRepository {
  constructor (readonly connection: Connection) {}
  
  async register (user: User): Promise<void> {
    const accountGenerator = new AccountGenerator();
    const account = await accountGenerator.generate();
    await this.connection.query('INSERT INTO ng.accounts (id, balance) VALUES ($1, $2)', [account.id, account.balance]);
    await this.connection.query('INSERT INTO ng.users (id, username, password, accountId) VALUES ($1, $2, $3, $4)', [
      user.id,
      user.username,
      user.password,
      account.id
    ]);
  }
  
  async getUser (username: string): Promise<User> {
    const [user] = await this.connection.query<User>('SELECT * FROM ng.users WHERE username = $1', [username])
    if (!user) throw new Error('User not found');
    return new User(user.id, user.username, user.password, user.accountId);
  }
}