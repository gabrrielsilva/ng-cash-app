import TransactController from '../../application/presentation/controller/TransactController';
import NodeJsonWebToken from '../../application/service/NodeJsonWebToken';
import Transact from '../../application/usecase/Transact';
import TransactionDatabaseRepository from '../../infra/repository/TransactionDatabaseRepository';
import UserDatabaseRepository from '../../infra/repository/UserDatabaseRepository';
import { connection } from './ConnectionFactory';

export function makeTransactController(): TransactController {
  const jwtService = new NodeJsonWebToken();
  const userRepository = new UserDatabaseRepository(connection);
  const transactionRepository = new TransactionDatabaseRepository(connection);
  const transact = new Transact(userRepository, transactionRepository);
  return new TransactController(transact, jwtService);
}