import User from '../../domain/entity/User';
import UserRepository from '../repository/UserRepository';

export default class GetUserByUsername {
  constructor (readonly userRepository: UserRepository) {}

  async run (input: Input): Promise<Output> {
    const user = await this.userRepository.getByUsername(input.username);
    return { user };
  }
}

type Input = {
  username: string;
}

type Output = {
  user: User
}