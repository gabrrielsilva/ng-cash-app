import Jwt from '../../service/interface/Jwt';
import Transact from '../../usecase/Transact';
import { MissingParamError } from './error';
import { UnauthorizedError } from './error/UnauthorizedError';
import { badRequest, ok, serverError, unauthorized } from './helper/HttpHelper';
import { HttpRequest, HttpResponse } from './port/Http';
import Controller from './type/Controller';
import getErrorMessage from './util/GetErrorMessage';

export default class TransactController implements Controller {
  constructor (readonly transact: Transact, readonly jwtService: Jwt) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.creditedAccountId || !httpRequest.body.value) {
        const field = !httpRequest.body.creditedAccountId ? 'creditedAccountId' : 'value';
        return badRequest(new MissingParamError(field));
      };
      if (!httpRequest.headers.authorization) {
        return unauthorized(new UnauthorizedError());
      }
      const token = httpRequest.headers.authorization as string;
      const decodedToken = await this.jwtService.validate(token.split(' ')[1]);
      if (!decodedToken.accountId) {
        return unauthorized(new UnauthorizedError());
      }
      const transactOutput = await this.transact.run({ 
        debitedAccountId: decodedToken.accountId, 
        creditedAccountId: httpRequest.body.creditedAccountId, 
        value: httpRequest.body.value
      });
      return ok(transactOutput);
    } catch (error) {
      return serverError(getErrorMessage(error))
    }
  }
}