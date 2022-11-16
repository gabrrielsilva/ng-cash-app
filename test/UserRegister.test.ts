import * as dotenv from 'dotenv';
import crypto from 'node:crypto';
import Bcrypt from '../src/application/service/Bcrypt';
import GetUser from '../src/application/usecase/GetUser';
import UserRegister from '../src/application/usecase/UserRegister';
import PgPromiseConnection from '../src/infra/database/PgPromiseConnection';
import UserDatabaseRepository from '../src/infra/repository/UserDatabaseRepository';
dotenv.config();

test('user should be able to register', async function() {
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
  const output = await getUser.run({ username: input.username });
  
  expect(output.user.id).toEqual(input.id);
  expect(output.user.username).toEqual(input.username);
  expect(await hashService.compare(input.password, output.user.password)).toBeTruthy();
})
