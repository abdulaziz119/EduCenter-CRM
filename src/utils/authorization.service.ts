// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from './env';
// import { ObjectId } from 'mongodb';
//
// export class AuthorizationService {
//   async sign(user: { phone: number; _id: ObjectId }): Promise<string> {
//     const data = {
//       user_id: user._id,
//       phone: user.phone,
//     };
//     return jwt.sign(data, JWT_SECRET, { expiresIn: '7d' });
//   }
// }
