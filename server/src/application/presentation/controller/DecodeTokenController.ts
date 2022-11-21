import Jwt from '../../service/interface/Jwt';
import { badRequest, ok, serverError } from './helper/HttpHelper';
import { HttpRequest, HttpResponse } from './port/Http';
import Controller from './type/Controller';
import getErrorMessage from './util/GetErrorMessage';

export default class DecodeTokenController implements Controller {
  constructor (readonly jwtService: Jwt) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.headers.authorization) {
        return badRequest({ name: 'NoToken', message: 'Invalid token or not provided'});
      };
      const token = httpRequest.headers.authorization as string;      
      const jwtServiceOutput = await this.jwtService.validate(token.split(' ')[1]);      
      return ok(jwtServiceOutput);
    } catch (error) {
      return serverError(getErrorMessage(error))
    }
  }
}