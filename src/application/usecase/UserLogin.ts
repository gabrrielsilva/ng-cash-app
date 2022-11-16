import * as dotenv from 'dotenv';
import UserRepository from '../repository/UserRepository';
import Hash from '../service/interface/Hash';
import Jwt from '../service/interface/Jwt';
dotenv.config();

export default class UserLogin {
  constructor (
    readonly userRepository: UserRepository, 
    readonly hashService: Hash, 
    readonly jwtService: Jwt
  ) {}

  async run (input: Input): Promise<Output> {
    const user = await this.userRepository.getUser(input.username);
    if (!user) throw new Error('User not found');
    const passwordMatch = await this.hashService.compare(input.password, user.password);
    if (!passwordMatch) throw new Error('Incorrect password');
    const token = await this.jwtService.sign({ sub: user.username, userId: user.id }, process.env.JWT_EXPIRATION_TIME as string);
    return { token };
  }
}

type Input = {
  username: string;
  password: string;
}

type Output = {
  token: string
}