import GetTransactionsController from '../../application/presentation/controller/GetTransactionsController';
import NodeJsonWebToken from '../../application/service/NodeJsonWebToken';
import GetTransactions from '../../application/usecase/GetTransactions';
import TransactionDatabaseRepository from '../../infra/repository/TransactionDatabaseRepository';
import { connection } from './ConnectionFactory';

export function makeGetTransactionsController(): GetTransactionsController {
  const jwtService = new NodeJsonWebToken();
  const transactionRepository = new TransactionDatabaseRepository(connection);
  const getTransactions = new GetTransactions(transactionRepository);
  return new GetTransactionsController(getTransactions, jwtService);
}