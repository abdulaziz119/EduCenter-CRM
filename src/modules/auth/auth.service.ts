import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { JWT_SECRET } from '../../utils/env';
import { AuthCreateDto } from './dto/auth.dto';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { MODELS } from '../../constants';
import { Repository } from 'typeorm';
import { StudentEntity } from '../../entity/student.entity';
import { Md5 } from 'ts-md5';
import { TeacherEntity } from '../../entity/teacher.entity';

export class AuthorizationService {
  constructor(
    @Inject(MODELS.STUDENTS)
    private readonly studentRepo: Repository<StudentEntity>,
    @Inject(MODELS.TEACHERS)
    private readonly teacherRepo: Repository<TeacherEntity>,
  ) {}

  static async sign(user: {
    phone: number;
    _id: ObjectId;
    type: string;
  }): Promise<string> {
    const data = {
      user_id: user._id.toString(),
      phone: user.phone,
      type: user.type,
    };

    try {
      return jwt.sign(data, JWT_SECRET, { expiresIn: '7d' });
    } catch (error) {
      console.error('Error signing token:', error);
      throw new Error('Token generation failed');
    }
  }

  async verify(
    payload: AuthCreateDto,
    token: string,
  ): Promise<{ user: StudentEntity | TeacherEntity | null; token?: string }> {
    try {
      const hashedPassword: string = Md5.hashStr(payload.password);
      const decoded = jwt.verify(token, JWT_SECRET) as {
        user_id: string;
        phone: number;
        type: string;
      };

      if (!decoded.user_id || !decoded.type) {
        throw new Error('Invalid token structure');
      }

      const userId = new ObjectId(decoded.user_id);
      const user: StudentEntity | TeacherEntity = await this.getUserByType(
        decoded.type,
        userId,
      );
      if (!user) {
        throw new Error(`User of type ${decoded.type} not found`);
      }

      if (user.password !== hashedPassword) {
        throw new Error('Invalid password');
      }

      const newToken: string = await AuthorizationService.sign({
        phone: user.phone,
        _id: user._id,
        type: decoded.type,
      });

      return { user, token: newToken };
    } catch (error) {
      console.error('Error verifying token:', error.message);
      throw new UnauthorizedException('Token verification failed');
    }
  }

  private async getUserByType(
    type: string,
    userId: ObjectId,
  ): Promise<StudentEntity | TeacherEntity | null> {
    if (type === 'student') {
      const student: StudentEntity = await this.studentRepo.findOne({
        where: { _id: userId },
      });
      if (!student) {
        return null;
      }
      return student;
    } else if (type === 'teacher') {
      const teacher: TeacherEntity = await this.teacherRepo.findOne({
        where: { _id: userId },
      });
      if (!teacher) {
        return null;
      }
      return teacher;
    } else {
      console.error(`Unsupported user type: ${type}`);
      throw new UnauthorizedException(`Unsupported user type: ${type}`);
    }
  }
}
