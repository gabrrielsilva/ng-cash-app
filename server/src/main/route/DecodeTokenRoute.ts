import { Router } from 'express';
import { adaptRoute } from '../adapter/ExpressRoute';
import { makeDecodeTokenController } from '../factory/DecodeTokenFactory';

export default function (router: Router) {
  router.post('/decode', adaptRoute(makeDecodeTokenController()));
}