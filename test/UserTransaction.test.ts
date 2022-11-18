import crypto from 'crypto';
import Bcrypt from '../src/application/service/Bcrypt';
import GetTransactions from '../src/application/usecase/GetTransactions';
import GetUserAccount from '../src/application/usecase/GetUserAccount';
import Transact from '../src/application/usecase/Transact';
import UserRegister from '../src/application/usecase/UserRegister';
import PgPromiseConnection from '../src/infra/database/PgPromiseConnection';
import TransactionDatabaseRepository from '../src/infra/repository/TransactionDatabaseRepository';
import UserDatabaseRepository from '../src/infra/repository/UserDatabaseRepository';

test('user should be able to transact', async function() {
  const connection = new PgPromiseConnection();
  const hashService = new Bcrypt();
  const userRepository = new UserDatabaseRepository(connection);
  const transactionRepository = new TransactionDatabaseRepository(connection);
  const debitedUser = {
    id: crypto.randomUUID(),
    username: 'debited',
    password: 'Debited1',
    accountId: crypto.randomUUID()
  };
  const creditedUser = {
    id: crypto.randomUUID(),
    username: 'credited',
    password: 'Credited1',
    accountId: crypto.randomUUID()
  }
  const firstTransactionValue = 50;
  const secondTransactionValue = 25;
  const userRegister = new UserRegister(userRepository, hashService);
  await userRegister.run(debitedUser);
  await userRegister.run(creditedUser);
  const transact = new Transact(userRepository, transactionRepository);
  const firstTransaction = await transact.run({ debitedAccountId: debitedUser.accountId, creditedAccountId: creditedUser.accountId, value: firstTransactionValue });
  const secondTransaction = await transact.run({ debitedAccountId: debitedUser.accountId, creditedAccountId: creditedUser.accountId, value: secondTransactionValue });
  const getUserAccount = new GetUserAccount(userRepository);
  const newUserBalanceDebited = await getUserAccount.run({ accountId: debitedUser.accountId });
  const newUserBalanceCredited = await getUserAccount.run({ accountId: creditedUser.accountId });
  const getTransactions = new GetTransactions(transactionRepository);
  const debitedUserTransactions = await getTransactions.run({ accountId: debitedUser.accountId });
  const creditedUserTransactions = await getTransactions.run({ accountId: creditedUser.accountId });

  expect(firstTransaction.value).toEqual(firstTransactionValue);
  expect(firstTransaction.debitedAccountId).toEqual(debitedUser.accountId);
  expect(firstTransaction.creditedAccountId).toEqual(creditedUser.accountId);
  expect(secondTransaction.value).toEqual(secondTransactionValue);
  expect(secondTransaction.debitedAccountId).toEqual(debitedUser.accountId);
  expect(secondTransaction.creditedAccountId).toEqual(creditedUser.accountId);
  expect(newUserBalanceDebited.account.balance).toEqual(100 - firstTransactionValue - secondTransactionValue);
  expect(newUserBalanceCredited.account.balance).toEqual(100 + firstTransactionValue + secondTransactionValue);
  expect(debitedUserTransactions.transactions.length).toBe(2);
  expect(creditedUserTransactions.transactions.length).toBe(2);
})