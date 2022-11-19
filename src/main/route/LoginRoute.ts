import { Router } from 'express';
import { adaptRoute } from '../adapter/ExpressRoute';
import { makeLoginController } from '../factory/LoginFactory';

export default function (router: Router) {
  router.post('/login', adaptRoute(makeLoginController()));
}