import PgPromiseConnection from '../infra/database/PgPromiseConnection';
import TransactionDatabaseRepository from '../infra/repository/TransactionDatabaseRepository';
import UserDatabaseRepository from '../infra/repository/UserDatabaseRepository';
import Bcrypt from './service/Bcrypt';
import NodeJsonWebToken from './service/NodeJsonWebToken';

export const connection = new PgPromiseConnection();
export const userRepository = new UserDatabaseRepository(connection);
export const transactionRepository = new TransactionDatabaseRepository(connection);
export const hashService = new Bcrypt();
export const jwtService = new NodeJsonWebToken();