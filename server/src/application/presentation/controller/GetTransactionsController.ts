import Jwt from '../../service/interface/Jwt';
import GetTransactions from '../../usecase/GetTransactions';
import { UnauthorizedError } from './error/UnauthorizedError';
import { ok, serverError, unauthorized } from './helper/HttpHelper';
import { HttpRequest, HttpResponse } from './port/Http';
import Controller from './type/Controller';

export default class GetTransactionsController implements Controller {
  constructor (readonly getTransactions: GetTransactions, readonly jwtService: Jwt) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.headers.authorization) {
        return unauthorized(new UnauthorizedError());
      };
      const token = httpRequest.headers.authorization as string;
      const decodedToken = await this.jwtService.validate(token.split(' ')[1]);
      if (!decodedToken.accountId) {
        return unauthorized(new UnauthorizedError());
      }
      const getTransactionsOutput = await this.getTransactions.run({ accountId: decodedToken.accountId });
      return ok(getTransactionsOutput);
    } catch (e) {
      return serverError('internal')
    }
  }
}