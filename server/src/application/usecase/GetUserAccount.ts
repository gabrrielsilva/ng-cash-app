import Account from '../../domain/entity/Account';
import UserRepository from '../repository/UserRepository';

export default class GetUserAccount {
  constructor (readonly userRepository: UserRepository) {}

  async run (input: Input): Promise<Output> {
    const account = await this.userRepository.getUserAccount(input.accountId);
    return { account };
  }
}

type Input = {
  accountId: string;
}

type Output = {
  account: Account
}