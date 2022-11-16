import User from '../../domain/entity/User';

export default interface UserRepository {
  getUser (username: string): Promise<User>;
  register (user: User): Promise<void>;
}