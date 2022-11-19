import { Router } from 'express';
import { adaptRoute } from '../adapter/ExpressRoute';
import { makeRegisterUserController } from '../factory/RegisterUserFactory';

export default function (router: Router) {
  router.post('/register', adaptRoute(makeRegisterUserController()));
}