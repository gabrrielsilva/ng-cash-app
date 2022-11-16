import User from '../../domain/entity/User';
import UserRepository from '../repository/UserRepository';

export default class GetUser {
  constructor (readonly userRepository: UserRepository) {}

  async run (input: Input): Promise<Output> {
    const user = await this.userRepository.getUser(input.username);
    return { user: user };
  }
}

type Input = {
  username: string;
}

type Output = {
  user: User
}