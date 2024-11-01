import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { MODELS } from '../../constants';
import { PaginationResponse } from '../../utils/pagination.response';
import { getPaginationResponse } from '../../utils/pagination.builder';
import { ObjectId } from 'mongodb';
import { ParamIdDto } from '../../utils/dto/params.dto';
import { PaginateParamsDto } from '../../utils/dto/paginate.dto';
import { AuthorizationService } from '../auth/auth.service';
import {
  SingleResponse,
  StudentCreateDto,
  StudentUpdateDto,
} from './dto/student.dto';
import { StudentEntity } from '../../entity/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @Inject(MODELS.STUDENTS)
    private readonly studentRepo: Repository<StudentEntity>,
  ) {}

  async create(
    payload: StudentCreateDto,
  ): Promise<SingleResponse<{ id: ObjectId; token: string }>> {
    const objectId: ObjectId = new ObjectId(payload.groupId);
    const StudentModel: StudentEntity = new StudentEntity();
    StudentModel.first_name = payload.first_name;
    StudentModel.last_name = payload.last_name;
    StudentModel.birthDate = payload.birthDate;
    StudentModel.phone = payload.phone;
    StudentModel.groupId = objectId;
    StudentModel.isPaid = payload.isPaid;
    try {
      const savedStudent: StudentEntity =
        await this.studentRepo.save(StudentModel);
      const user: { _id: ObjectId; phone: number; type: string } = {
        _id: savedStudent._id,
        phone: savedStudent.phone,
        type: 'teacher',
      };
      const token: string = await AuthorizationService.sign(user);
      const result: { id: ObjectId; token: string } = {
        id: savedStudent._id,
        token: token,
      };
      return { result: result };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to create a Teacher',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    payload: PaginateParamsDto,
  ): Promise<PaginationResponse<StudentEntity[]>> {
    const page = payload.page || 1;
    const limit = payload.limit || 10;
    const count = await this.studentRepo.count();
    if (!count) return getPaginationResponse([], page, limit, count);
    const serverKeys = await this.studentRepo.find({
      where: {},
      skip: (page - 1) * limit,
      take: limit,
    });
    if (limit && !isNaN(page))
      return getPaginationResponse<StudentEntity>(
        serverKeys,
        page,
        limit,
        count,
      );
  }

  async findOne(body: ParamIdDto): Promise<SingleResponse<StudentEntity>> {
    const { id } = body;
    try {
      const objectId = new ObjectId(id);
      const student = await this.studentRepo.findOne({
        where: { _id: objectId },
      });
      if (!student) {
        throw new NotFoundException(`Teacher with ID ${id} not found`);
      }
      return { result: student };
    } catch (error) {
      throw new HttpException(
        { message: `Failed get with ID ${id}`, error: error.detail },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    payload: StudentUpdateDto,
  ): Promise<SingleResponse<StudentEntity>> {
    const { id } = payload;
    const objectId = new ObjectId(id);
    const StudentModel = await this.studentRepo.findOne({
      where: { _id: objectId },
    });

    if (!StudentModel) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
    try {
      Object.entries(StudentModel).forEach(([key, value]) => {
        StudentModel[key] = payload[key] || value;
      });
      return { result: await this.studentRepo.save(StudentModel) };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to update the Template Portion',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(payload: ParamIdDto): Promise<any> {
    const { id } = payload;
    const objectId = new ObjectId(id);
    const student = await this.studentRepo.findOne({
      where: { _id: objectId },
    });

    if (!student) {
      throw new NotFoundException('Teacher not found');
    }

    student.deleted_at = new Date();
    await this.studentRepo.save(student);
  }
}
