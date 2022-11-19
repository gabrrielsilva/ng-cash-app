import GetUserAccountController from '../../application/presentation/controller/GetUserAccountController';
import NodeJsonWebToken from '../../application/service/NodeJsonWebToken';
import GetUserAccount from '../../application/usecase/GetUserAccount';
import UserDatabaseRepository from '../../infra/repository/UserDatabaseRepository';
import { connection } from './ConnectionFactory';

export function makeGetUserAccountController(): GetUserAccountController {
  const jwtService = new NodeJsonWebToken();
  const userRepository = new UserDatabaseRepository(connection);
  const getUserAccount = new GetUserAccount(userRepository);
  return new GetUserAccountController(getUserAccount, jwtService);
}