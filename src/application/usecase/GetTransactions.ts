import Transaction from '../../domain/entity/Transaction';
import TransactionRepository from '../repository/TransactionRepository';

export default class GetTransactions {
  constructor (readonly transactionRepository: TransactionRepository) {}

  async run (input: Input): Promise<Output> {
    const transactions = await this.transactionRepository.getAll(input.accountId);
    return { transactions };
  }
}

type Input = {
  accountId: string;
}

type Output = {
  transactions: Transaction[]
}