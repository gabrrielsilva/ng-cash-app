import User from '../../domain/entity/User';
import UserRepository from '../repository/UserRepository';
import Hash from '../service/interface/Hash';

export default class RegisterUser {
  constructor (readonly userRepository: UserRepository, readonly hashService: Hash) {}

  async run (input: Input): Promise<void> {
    const user = new User(input.id, input.username, input.password, input.accountId)
    const hashedPassword = await this.hashService.hash(input.password, 7);
    await this.userRepository.register({ id: user.id, username: user.username, password: hashedPassword, accountId: user.accountId });
  }
}

type Input = {
  id: string;
  username: string;
  password: string;
  accountId: string
}