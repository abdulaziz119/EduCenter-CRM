import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { MODELS } from '../../constants';
import { SingleResponse, TeacherUpdateDto } from './dto/teacher.dto';
import { TeacherEntity } from '../../entity/teacher.entity';
import { PaginationResponse } from '../../utils/pagination.response';
import { getPaginationResponse } from '../../utils/pagination.builder';
import { ObjectId, UpdateResult } from 'mongodb';
import { ParamIdDto } from '../../utils/dto/params.dto';
import { PaginateParamsDto } from '../../utils/dto/paginate.dto';

@Injectable()
export class TeacherService {
  constructor(
    @Inject(MODELS.TEACHERS)
    private readonly teacherRepo: Repository<TeacherEntity>,
  ) {}

  async create(payload: any): Promise<SingleResponse<TeacherEntity>> {
    const objectId = new ObjectId(payload.groupId);
    const TeacherModel = new TeacherEntity();
    TeacherModel.first_name = payload.first_name;
    TeacherModel.last_name = payload.last_name;
    TeacherModel.birthDate = payload.birthDate;
    TeacherModel.phone = payload.phone;
    TeacherModel.groupId = objectId;
    try {
      return { result: await this.teacherRepo.save(TeacherModel) };
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
    const page = payload.page || 1;
    const limit = payload.limit || 10;
    const count = await this.teacherRepo.count();
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
      const objectId = new ObjectId(id);
      const teacher = await this.teacherRepo.findOne({
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
    const objectId = new ObjectId(id);
    const TemplatePortion = await this.teacherRepo.findOne({
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
    const objectId = new ObjectId(id);
    const teacher = await this.teacherRepo.findOne({
      where: { _id: objectId },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    teacher.deleted_at = new Date();
    await this.teacherRepo.save(teacher);
  }
}
