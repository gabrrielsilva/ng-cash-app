import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Jwt from './interface/Jwt';
dotenv.config();

export default class NodeJsonWebToken implements Jwt {
  constructor () {}

  async sign (payload: object, expiresIn: string): Promise<string> {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, { expiresIn });
    return token;
  }

  async validate (token: string): Promise<object> {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as jwt.JwtPayload;
    return decoded;
  }
}