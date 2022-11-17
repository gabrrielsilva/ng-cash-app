import crypto from 'crypto';
import Bcrypt from '../src/application/service/Bcrypt';
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
  const value = 50;
  const userRegister = new UserRegister(userRepository, hashService);
  await userRegister.run(debitedUser);
  await userRegister.run(creditedUser);
  const transact = new Transact(userRepository, transactionRepository);
  const transaction = await transact.run({ debitedAccountId: debitedUser.accountId, creditedAccountId: creditedUser.accountId, value });
  const getUserAccount = new GetUserAccount(userRepository);
  const newUserBalanceDebited = await getUserAccount.run({ accountId: debitedUser.accountId });
  const newUserBalanceCredited = await getUserAccount.run({ accountId: creditedUser.accountId });

  expect(transaction.value).toEqual(value);
  expect(transaction.debitedAccountId).toEqual(debitedUser.accountId);
  expect(transaction.creditedAccountId).toEqual(creditedUser.accountId);
  expect(newUserBalanceDebited.account.balance).toEqual(100 - value);
  expect(newUserBalanceCredited.account.balance).toEqual(100 + value);
})