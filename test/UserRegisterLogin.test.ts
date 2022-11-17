import * as dotenv from 'dotenv';
import crypto from 'node:crypto';
import Bcrypt from '../src/application/service/Bcrypt';
import NodeJsonWebToken from '../src/application/service/NodeJsonWebToken';
import GetUser from '../src/application/usecase/GetUser';
import GetUserAccount from '../src/application/usecase/GetUserAccount';
import UserLogin from '../src/application/usecase/UserLogin';
import UserRegister from '../src/application/usecase/UserRegister';
import PgPromiseConnection from '../src/infra/database/PgPromiseConnection';
import UserDatabaseRepository from '../src/infra/repository/UserDatabaseRepository';
dotenv.config();

test('user should be able to register and login', async function() {
  const connection = new PgPromiseConnection();
  const userRepository = new UserDatabaseRepository(connection);
  const input = {
    id: crypto.randomUUID(),
    username: 'gabriel',
    password: 'Senha123',
  }
  const hashService = new Bcrypt();
  const userRegister = new UserRegister(userRepository, hashService);
  await userRegister.run(input);
  const getUser = new GetUser(userRepository);
  const getUserOutput = await getUser.run({ username: input.username });
  const jwtService = new NodeJsonWebToken();
  const userLogin = new UserLogin(userRepository, hashService, jwtService);
  const userLoginOutput = await userLogin.run({ username: input.username, password: input.password });
  const decoded = await jwtService.validate(userLoginOutput.token);

  expect(decoded).toMatchObject({ sub: input.username, accountId: getUserOutput.user.accountId });

  const getUserAccount = new GetUserAccount(userRepository);
  const getUserAccountOutput = await getUserAccount.run({ accountId: getUserOutput.user.accountId as string });

  expect(getUserAccountOutput.account.balance).toBe(100); //

  connection.close();
})
