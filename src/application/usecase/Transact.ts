import Transaction from '../../domain/entity/Transaction';
import TransactionRepository from '../repository/TransactionRepository';
import UserRepository from '../repository/UserRepository';

export default class Transact {
  constructor(readonly userRepository: UserRepository, readonly transactionRepository: TransactionRepository) {}

  async run (input: Input): Promise<Transaction> {
    const creditedAccount = await this.userRepository.getUserAccount(input.creditedAccountId);
    if (!creditedAccount) throw new Error('Receiving user does not exist');
    const debitedAccount = await this.userRepository.getUserAccount(input.debitedAccountId);
    const transaction = await this.transactionRepository.transact(debitedAccount, creditedAccount, input.value);
    return transaction;
  }
}

type Input = {
  debitedAccountId: string,
  creditedAccountId: string,
  value: number,
}