import GetUserByUsername from '../src/application/usecase/GetUserByUsername';
import UserRegister from '../src/application/usecase/UserRegister';
import PgPromiseConnection from '../src/infra/database/PgPromiseConnection';
import UserDatabaseRepository from '../src/infra/repository/UserDatabaseRepository';

test('user should be able to register', async function() {
  const connection = new PgPromiseConnection();
  const userRepository = new UserDatabaseRepository(connection);
  const input = {
    username: 'gabriel',
    password: 'Senha123'
  }
  const userRegister = new UserRegister(userRepository);
  await userRegister.run(input);
  const getUser = new GetUserByUsername(userRepository);
  const output = await getUser.run({ username: input.username });

  expect(output.user.username).toEqual(input.username);
  expect(output.user.password).toEqual(input.password);
})
