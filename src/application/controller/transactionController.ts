import { Request, Response, Router } from 'express';
export const transactionRoutes = Router();

transactionRoutes.post('/', async function (request: Request, response: Response) {
  response.sendStatus(200);
});