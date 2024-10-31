import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { JWT_SECRET } from './env';
dotenv.config();

export class AuthorizationService {
  async sign(user: any, role: any): Promise<string> {
    const data = {
      user_id: user.id,
      email: user.email,
    };
    return jwt.sign(data, JWT_SECRET, { expiresIn: '7d' });
  }
}
