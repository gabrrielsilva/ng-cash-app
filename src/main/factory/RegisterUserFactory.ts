import RegisterUserController from '../../application/presentation/controller/RegisterUserController';
import Bcrypt from '../../application/service/Bcrypt';
import RegisterUser from '../../application/usecase/RegisterUser';
import UserDatabaseRepository from '../../infra/repository/UserDatabaseRepository';
import { connection } from './ConnectionFactory';

export function makeRegisterUserController(): RegisterUserController {
  const userRepository = new UserDatabaseRepository(connection);
  const hashService = new Bcrypt();
  const registerUser = new RegisterUser(userRepository, hashService);
  return new RegisterUserController(registerUser);
}