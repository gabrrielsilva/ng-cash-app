import crypto from 'crypto';
import TransactionRepository from '../../application/repository/TransactionRepository';
import Account from '../../domain/entity/Account';
import BalanceGeneratorCashIn from '../../domain/entity/BalanceGeneratorCashIn';
import BalanceGeneratorCashOut from '../../domain/entity/BalanceGeneratorCashOut';
import Transaction from '../../domain/entity/Transaction';
import Connection from '../database/Connection';

export default class TransactionDatabaseRepository implements TransactionRepository {
  constructor(readonly connection: Connection) {}

  async transact (debitedAccount: Account, creditedAccount: Account, value: number): Promise<Transaction> {
    const balanceGeneratorCashOut = new BalanceGeneratorCashOut();
    const newUserBalanceDebited = await balanceGeneratorCashOut.generate(debitedAccount.balance, value);
    const balanceGeneratorCashIn = new BalanceGeneratorCashIn();
    const newUserBalanceCredited = await balanceGeneratorCashIn.generate(creditedAccount.balance, value);
    await this.connection.query('UPDATE ng.accounts SET balance = $1 WHERE id = $2', [newUserBalanceDebited, debitedAccount.id]);
    await this.connection.query('UPDATE ng.accounts SET balance = $1 WHERE id = $2', [newUserBalanceCredited, creditedAccount.id]);
    const id = crypto.randomUUID();
    const createdAt = new Date();
    const transaction = new Transaction(id, debitedAccount.id, creditedAccount.id, value, createdAt);
    await this.connection.query('INSERT INTO ng.transactions (id, debitedaccountid, creditedAccountId, value, createdAt) VALUES ($1, $2, $3, $4, $5)', [
      transaction.id,
      transaction.debitedaccountid,
      transaction.creditedaccountid,
      transaction.value,
      transaction.createdat
    ])
    return transaction;
  }
}