import Jwt from '../../service/interface/Jwt';
import GetUserAccount from '../../usecase/GetUserAccount';
import { UnauthorizedError } from './error/UnauthorizedError';
import { ok, serverError, unauthorized } from './helper/HttpHelper';
import { HttpRequest, HttpResponse } from './port/Http';
import Controller from './type/Controller';
import getErrorMessage from './util/GetErrorMessage';

export default class GetUserAccountController implements Controller {
  constructor (readonly getUserAccount: GetUserAccount, readonly jwtService: Jwt) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.headers.authorization) {
        return unauthorized(new UnauthorizedError());
      };      
      const token = httpRequest.headers.authorization as string;
      const decodedToken = await this.jwtService.validate(token.split(' ')[1]);
      if (!decodedToken.accountId) {
        return unauthorized(new UnauthorizedError());
      };
      const getUserAccountOutput = await this.getUserAccount.run({ accountId: decodedToken.accountId });      
      return ok(getUserAccountOutput);
    } catch (error) {
      return serverError(getErrorMessage(error))
    }
  }
}