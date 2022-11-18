import { Request, Response, Router } from 'express';
import crypto from 'node:crypto';
import { hashService, jwtService, userRepository } from '../main';
import GetUserAccount from '../usecase/GetUserAccount';
import UserLogin from '../usecase/UserLogin';
import UserRegister from '../usecase/UserRegister';

export const userRoutes = Router();

userRoutes.post('/register', async function (request: Request, response: Response) {
  try {
    const data = request.body as Credentials;
    const userRegister = new UserRegister(userRepository, hashService);
    await userRegister.run({ id: crypto.randomUUID(), username: data.username, password: data.password, accountId: crypto.randomUUID() });
    response.end().status(201);
  } catch (e) {
    response.send(e).status(500);
  }
});

userRoutes.post('/login', async function (request: Request, response: Response) {
  try {
    const data = request.body as Credentials;
    const userLogin = new UserLogin(userRepository, hashService, jwtService);
    const token = await userLogin.run({ username: data.username, password: data.password });
    return response.json(token);
  } catch (e) {
    response.send(e).status(500);
  }
});

userRoutes.get('/account', async function (request: Request, response: Response) {
  try {
    const token = request.headers.authorization;
    if (!token) return response.end().status(401);
    const getUserAccount = new GetUserAccount(userRepository);
    const decoded = await jwtService.validate(token);
    if (!decoded.accountId) return response.end().status(401);
    const userAccount = await getUserAccount.run({ accountId: decoded.accountId });
    return response.json(userAccount.account);
  } catch (e) {
    response.send(e).status(500);
  }
});

type Credentials = {
  username: string;
  password: string
}