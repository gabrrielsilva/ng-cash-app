import { Router } from 'express';
import { adaptRoute } from '../adapter/ExpressRoute';
import { makeTransactController } from '../factory/TransactFactory';

export default function (router: Router) {
  router.post('/transact', adaptRoute(makeTransactController()));
}