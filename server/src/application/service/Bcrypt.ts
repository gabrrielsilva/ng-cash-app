import bcrypt from 'bcrypt';
import Hash from './interface/Hash';

export default class Bcrypt implements Hash {
  async hash (plainText: string, salt: number): Promise<string> {
    const hashText = await bcrypt.hash(plainText, salt);
    return hashText;
  }

  async compare (plainText: string, encrypted: string): Promise<boolean> {
    const result = await bcrypt.compare(plainText, encrypted);
    return result;
  }
}