import Login from '../../usecase/Login';
import { MissingParamError } from './error';
import { badRequest, ok, serverError } from './helper/HttpHelper';
import { HttpRequest, HttpResponse } from './port/Http';
import Controller from './type/Controller';
import getErrorMessage from './util/GetErrorMessage';

export default class LoginController implements Controller {
  constructor (readonly login: Login) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.username || !httpRequest.body.password) {
        const field = !httpRequest.body.username ? 'username' : 'password';
        return badRequest(new MissingParamError(field));
      };
      const loginOutput = await this.login.run({ username: httpRequest.body.username, password: httpRequest.body.password });
      return ok(loginOutput);
    } catch (error) {
      return serverError(getErrorMessage(error))
    }
  }
}