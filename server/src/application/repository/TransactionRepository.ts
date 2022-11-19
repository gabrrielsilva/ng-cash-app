import Account from '../../domain/entity/Account';
import Transaction from '../../domain/entity/Transaction';

export default interface TransactionRepository {
  getAll (accountId: string): Promise<Transaction[]>
  transact (debitedAccount: Account, creditedAccount: Account, value: number): Promise<Transaction>
}