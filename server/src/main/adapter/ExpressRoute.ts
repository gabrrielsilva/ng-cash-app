import { Request, Response } from 'express';
import { HttpRequest } from '../../application/presentation/controller/port/Http';
import Controller from '../../application/presentation/controller/type/Controller';

export function adaptRoute (controller: Controller) {
  return async function (request: Request, response: Response) {
    const httpRequest: HttpRequest = {
      body: request.body,
      headers: request.headers
    }
    const httpResponse = await controller.handle(httpRequest);
    response.status(httpResponse.statusCode).json(httpResponse.body);
  }
}