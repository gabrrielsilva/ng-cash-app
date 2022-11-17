import Account from '../../domain/entity/Account';
import Transaction from '../../domain/entity/Transaction';

export default interface TransactionRepository {
  transact (debitedAccount: Account, creditedAccount: Account, value: number): Promise<Transaction>
}