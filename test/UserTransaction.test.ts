import PgPromiseConnection from '../src/infra/database/PgPromiseConnection';
import TransactionDatabaseRepository from '../src/infra/repository/TransactionDatabaseRepository';

test('user should be able to transact', async function() {
  const connection = new PgPromiseConnection();
  const transactionRepository = new TransactionDatabaseRepository(connection);
})