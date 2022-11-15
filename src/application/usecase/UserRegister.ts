import UserRepository from '../repository/UserRepository';

export default class UserRegister {
  constructor (readonly userRepository: UserRepository) {}

  async run (input: Input): Promise<void> {
    await this.userRepository.register({ username: input.username, password: input.password })
  }
}

type Input = {
  username: string;
  password: string
}