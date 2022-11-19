import Account from '../../domain/entity/Account';
import User from '../../domain/entity/User';

export default interface UserRepository {
  getUser (username: string): Promise<User>;
  getUserAccount (accountId: string): Promise<Account>;
  register (user: User): Promise<void>;
}