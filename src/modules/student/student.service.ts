import {
  BadRequestException,
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
import { Md5 } from 'ts-md5';
import { GroupEntity } from '../../entity/group.entity';

@Injectable()
export class StudentService {
  constructor(
    @Inject(MODELS.STUDENTS)
    private readonly studentRepo: Repository<StudentEntity>,
    @Inject(MODELS.GROUPS)
    private readonly groupRepo: Repository<GroupEntity>,
  ) {}

  async create(
    payload: StudentCreateDto,
  ): Promise<SingleResponse<{ id: ObjectId; token: string }>> {
    payload.password = Md5.hashStr(payload.password);
    const objectId: ObjectId = new ObjectId(payload.groupId);
    const StudentModel: StudentEntity = new StudentEntity();
    StudentModel.first_name = payload.first_name;
    StudentModel.last_name = payload.last_name;
    StudentModel.birthDate = payload.birthDate;
    StudentModel.phone = payload.phone;
    StudentModel.password = payload.password;
    StudentModel.groupId = objectId;
    StudentModel.isPaid = payload.isPaid;
    try {
      const savedStudent: StudentEntity =
        await this.studentRepo.save(StudentModel);
      const user: { _id: ObjectId; phone: number; type: string } = {
        _id: savedStudent._id,
        phone: savedStudent.phone,
        type: 'student',
      };
      const token: string = await AuthorizationService.sign(user);
      return { result: { id: savedStudent._id, token } };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to create a Student',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    payload: PaginateParamsDto,
  ): Promise<
    PaginationResponse<(StudentEntity & { group?: GroupEntity | null })[]>
  > {
    const page: number = payload.page || 1;
    const limit: number = payload.limit || 10;
    const count: number = await this.studentRepo.count();

    if (!count) return getPaginationResponse([], page, limit, count);

    const students: StudentEntity[] = await this.studentRepo.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    const studentsWithGroups = await Promise.all(
      students.map(async (student) => {
        const group: GroupEntity = await this.groupRepo.findOne({
          where: { _id: student.groupId },
        });

        return {
          ...student,
          group: group || null,
        };
      }),
    );

    return getPaginationResponse(studentsWithGroups, page, limit, count);
  }

  async findOne(
    body: ParamIdDto,
  ): Promise<
    SingleResponse<
      StudentEntity & { group?: GroupEntity | GroupEntity[] | null }
    >
  > {
    const { id } = body;

    try {
      if (!ObjectId.isValid(id)) {
        throw new BadRequestException(`Invalid ID format: ${id}`);
      }

      const objectId: ObjectId = new ObjectId(id);
      const student: StudentEntity = await this.studentRepo.findOne({
        where: { _id: objectId },
      });

      if (!student) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }

      const group: GroupEntity = await this.groupRepo.findOne({
        where: { _id: student.groupId },
      });

      return {
        result: {
          ...student,
          group: group || null,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Failed to get student with ID ${id}`,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    payload: StudentUpdateDto,
  ): Promise<SingleResponse<StudentEntity>> {
    const { id } = payload;
    const objectId: ObjectId = new ObjectId(id);
    const StudentModel: StudentEntity = await this.studentRepo.findOne({
      where: { _id: objectId },
    });

    if (!StudentModel) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    try {
      Object.entries(StudentModel).forEach(([key, value]) => {
        StudentModel[key] = payload[key] || value;
      });
      return { result: await this.studentRepo.save(StudentModel) };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to update the Student',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(payload: ParamIdDto): Promise<void> {
    const { id } = payload;
    const objectId: ObjectId = new ObjectId(id);

    try {
      const student: StudentEntity = await this.studentRepo.findOneOrFail({
        where: { _id: objectId },
      });
      student.deleted_at = new Date();
      await this.studentRepo.save(student);
    } catch (error) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }
}
