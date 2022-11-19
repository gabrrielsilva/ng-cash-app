import LoginController from '../../application/presentation/controller/LoginController';
import Bcrypt from '../../application/service/Bcrypt';
import NodeJsonWebToken from '../../application/service/NodeJsonWebToken';
import Login from '../../application/usecase/Login';
import UserDatabaseRepository from '../../infra/repository/UserDatabaseRepository';
import { connection } from './ConnectionFactory';

export function makeLoginController(): LoginController {
  const userRepository = new UserDatabaseRepository(connection);
  const hashService = new Bcrypt();
  const jwtService = new NodeJsonWebToken();
  const login = new Login(userRepository, hashService, jwtService);
  return new LoginController(login);
}