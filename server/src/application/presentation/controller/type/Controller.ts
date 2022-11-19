import { HttpRequest, HttpResponse } from '../port/Http';

export default interface Controller {
  handle (httpRequest: HttpRequest): Promise<HttpResponse>
}