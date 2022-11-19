import crypto from 'node:crypto';
import RegisterUser from '../../usecase/RegisterUser';
import { MissingParamError } from './error';
import { badRequest, ok, serverError } from './helper/HttpHelper';
import { HttpRequest, HttpResponse } from './port/Http';
import Controller from './type/Controller';
import getErrorMessage from './util/GetErrorMessage';

export default class RegisterUserController implements Controller {
  constructor (readonly registerUser: RegisterUser) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {      
      if (!httpRequest.body.username || !httpRequest.body.password) {
        const field = !httpRequest.body.username ? 'username' : 'password';
        return badRequest(new MissingParamError(field));
      };
      await this.registerUser.run({ 
        id: crypto.randomUUID(), 
        username: httpRequest.body.username, 
        password: httpRequest.body.password, 
        accountId: crypto.randomUUID() 
      })
      return ok(null);
    } catch (error) {
      return serverError(getErrorMessage(error))
    }
  }
}