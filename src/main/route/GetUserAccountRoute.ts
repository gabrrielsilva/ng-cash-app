import { Router } from 'express';
import { adaptRoute } from '../adapter/ExpressRoute';
import { makeGetUserAccountController } from '../factory/GetUserAccountFactory';

export default function (router: Router) {
  router.get('/account', adaptRoute(makeGetUserAccountController()));
}