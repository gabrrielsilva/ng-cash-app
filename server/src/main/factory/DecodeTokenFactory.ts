import DecodeTokenController from '../../application/presentation/controller/DecodeTokenController';
import NodeJsonWebToken from '../../application/service/NodeJsonWebToken';

export function makeDecodeTokenController(): DecodeTokenController {
  const jwtService = new NodeJsonWebToken();
  return new DecodeTokenController(jwtService);
}