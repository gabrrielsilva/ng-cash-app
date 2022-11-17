import User from '../../domain/entity/User';
import UserRepository from '../repository/UserRepository';
import Hash from '../service/interface/Hash';

export default class UserRegister {
  constructor (readonly userRepository: UserRepository, readonly hashService: Hash) {}

  async run (input: Input): Promise<void> {
    const hashedPassword = await this.hashService.hash(input.password, 7);    
    await this.userRepository.register(new User(input.id, input.username, hashedPassword, input.accountId));
  }
}

type Input = {
  id: string;
  username: string;
  password: string;
  accountId: string
}