import Transaction from '../../domain/entity/Transaction';
import TransactionRepository from '../repository/TransactionRepository';
import UserRepository from '../repository/UserRepository';

export default class Transact {
  constructor(readonly userRepository: UserRepository, readonly transactionRepository: TransactionRepository) {}

  async run (input: Input): Promise<Output> {
    const user = await this.userRepository.getUser(input.username);
    const creditedAccount = await this.userRepository.getUserAccount(user.accountId);
    if (!creditedAccount) throw new Error('Receiving user does not exist');
    const debitedAccount = await this.userRepository.getUserAccount(input.debitedAccountId);
    if (/[a-zA-Z]/.test(input.value.toString()) || !parseFloat(input.value.toString())) throw new Error('Value is not a number');
    const transaction = await this.transactionRepository.transact(debitedAccount, creditedAccount, parseFloat(input.value.toString()));
    return { transaction };
  }
}

type Input = {
  debitedAccountId: string,
  username: string,
  value: number,
}

type Output = {
  transaction: Transaction
}