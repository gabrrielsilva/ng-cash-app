import User from '../../domain/entity/User';

export default interface UserRepository {
  getByUsername (username: string): Promise<User>;
  register (user: User): Promise<void>;
}