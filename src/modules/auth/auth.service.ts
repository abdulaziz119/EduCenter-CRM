import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { JWT_SECRET } from '../../utils/env';

export class AuthorizationService {
  static async sign(user: {
    phone: number;
    _id: ObjectId;
    type: string;
  }): Promise<string> {
    const data = {
      user_id: user._id,
      phone: user.phone,
      type: user.type,
    };

    try {
      return await jwt.sign(data, JWT_SECRET, { expiresIn: '7d' });
    } catch (error) {
      console.error('Error signing token:', error);
      throw new Error('Token generation failed');
    }
  }
}
