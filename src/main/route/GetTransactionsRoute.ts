import { Router } from 'express';
import { adaptRoute } from '../adapter/ExpressRoute';
import { makeGetTransactionsController } from '../factory/GetTransactionsFactory';

export default function (router: Router) {
  router.get('/transactions', adaptRoute(makeGetTransactionsController()));
}