import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { MODELS } from '../../constants';
import {
  SingleResponse,
  TeacherCreateDto,
  TeacherUpdateDto,
} from './dto/teacher.dto';
import { TeacherEntity } from '../../entity/teacher.entity';
import { PaginationResponse } from '../../utils/pagination.response';
import { getPaginationResponse } from '../../utils/pagination.builder';
import { ObjectId } from 'mongodb';
import { ParamIdDto } from '../../utils/dto/params.dto';
import { PaginateParamsDto } from '../../utils/dto/paginate.dto';
import { AuthorizationService } from '../auth/auth.service';

@Injectable()
export class TeacherService {
  constructor(
    @Inject(MODELS.TEACHERS)
    private readonly teacherRepo: Repository<TeacherEntity>,
  ) {}

  async create(
    payload: TeacherCreateDto,
  ): Promise<SingleResponse<{ id: ObjectId; token: string }>> {
    const objectId: ObjectId = new ObjectId(payload.groupId);
    const TeacherModel: TeacherEntity = new TeacherEntity();
    TeacherModel.first_name = payload.first_name;
    TeacherModel.last_name = payload.last_name;
    TeacherModel.birthDate = payload.birthDate;
    TeacherModel.phone = payload.phone;
    TeacherModel.groupId = objectId;
    try {
      const savedTeacher: TeacherEntity =
        await this.teacherRepo.save(TeacherModel);
      const user: { _id: ObjectId; phone: number; type: string } = {
        _id: savedTeacher._id,
        phone: savedTeacher.phone,
        type: 'teacher',
      };
      const token: string = await AuthorizationService.sign(user);
      const result: { id: ObjectId; token: string } = {
        id: savedTeacher._id,
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
  ): Promise<PaginationResponse<TeacherEntity[]>> {
    const page: number = payload.page || 1;
    const limit: number = payload.limit || 10;
    const count: number = await this.teacherRepo.count();
    if (!count) return getPaginationResponse([], page, limit, count);
    const serverKeys = await this.teacherRepo.find({
      where: {},
      skip: (page - 1) * limit,
      take: limit,
    });
    if (limit && !isNaN(page))
      return getPaginationResponse<TeacherEntity>(
        serverKeys,
        page,
        limit,
        count,
      );
  }

  async findOne(body: ParamIdDto): Promise<SingleResponse<TeacherEntity>> {
    const { id } = body;
    try {
      const objectId: ObjectId = new ObjectId(id);
      const teacher: TeacherEntity = await this.teacherRepo.findOne({
        where: { _id: objectId },
      });
      if (!teacher) {
        throw new NotFoundException(`Teacher with ID ${id} not found`);
      }
      return { result: teacher };
    } catch (error) {
      throw new HttpException(
        { message: `Failed get with ID ${id}`, error: error.detail },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    payload: TeacherUpdateDto,
  ): Promise<SingleResponse<TeacherEntity>> {
    const { id } = payload;
    const objectId: ObjectId = new ObjectId(id);
    const TemplatePortion: TeacherEntity = await this.teacherRepo.findOne({
      where: { _id: objectId },
    });

    if (!TemplatePortion) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
    try {
      Object.entries(TemplatePortion).forEach(([key, value]) => {
        TemplatePortion[key] = payload[key] || value;
      });
      return { result: await this.teacherRepo.save(TemplatePortion) };
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
    const objectId: ObjectId = new ObjectId(id);
    const teacher: TeacherEntity = await this.teacherRepo.findOne({
      where: { _id: objectId },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    teacher.deleted_at = new Date();
    await this.teacherRepo.save(teacher);
  }
}
