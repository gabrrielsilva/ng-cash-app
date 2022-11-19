import crypto from 'crypto';
import TransactionRepository from '../../application/repository/TransactionRepository';
import Account from '../../domain/entity/Account';
import BalanceGeneratorCashIn from '../../domain/entity/BalanceGeneratorCashIn';
import BalanceGeneratorCashOut from '../../domain/entity/BalanceGeneratorCashOut';
import Transaction from '../../domain/entity/Transaction';
import Connection from '../database/Connection';

export default class TransactionDatabaseRepository implements TransactionRepository {
  constructor(readonly connection: Connection) {}

  async getAll (accountId: string): Promise<Transaction[]> {
    const transactions = await this.connection.query<Transaction>('SELECT * FROM ng.transactions WHERE debitedAccountId = $1 OR creditedAccountId = $1', [accountId]);
    return transactions;
  }

  async transact (debitedAccount: Account, creditedAccount: Account, value: number): Promise<Transaction> {
    const id = crypto.randomUUID();
    const createdAt = new Date();
    const transaction = new Transaction(id, debitedAccount.id, creditedAccount.id, value, createdAt);
    const balanceGeneratorCashOut = new BalanceGeneratorCashOut();
    const newUserBalanceDebited = await balanceGeneratorCashOut.generate(debitedAccount.balance, transaction.value);
    const balanceGeneratorCashIn = new BalanceGeneratorCashIn();
    const newUserBalanceCredited = await balanceGeneratorCashIn.generate(creditedAccount.balance, transaction.value);
    await this.connection.query('UPDATE ng.accounts SET balance = $1 WHERE id = $2', [newUserBalanceDebited.value, debitedAccount.id]);
    await this.connection.query('UPDATE ng.accounts SET balance = $1 WHERE id = $2', [newUserBalanceCredited.value, creditedAccount.id]);
    await this.connection.query('INSERT INTO ng.transactions (id, debitedaccountid, creditedaccountid, value, createdat) VALUES ($1, $2, $3, $4, $5)', [
      transaction.id,
      transaction.debitedAccountId,
      transaction.creditedAccountId,
      transaction.value,
      transaction.createdAt
    ])
    return transaction;
  }
}