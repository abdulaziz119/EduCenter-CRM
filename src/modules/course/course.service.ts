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
import { CourseEntity } from '../../entity/course.entity';
import {
  CourseCreateDto,
  CourseUpdateDto,
  SingleResponse,
} from './dto/course.dto';

@Injectable()
export class CourseService {
  constructor(
    @Inject(MODELS.COURSES)
    private readonly courseRepo: Repository<CourseEntity>,
  ) {}

  async create(
    payload: CourseCreateDto,
  ): Promise<SingleResponse<CourseEntity>> {
    const GroupModel: CourseEntity = new CourseEntity();
    GroupModel.name = payload.name;
    GroupModel.description = payload.description;
    GroupModel.monthlyFee = payload.monthlyFee;
    GroupModel.duration = payload.duration;
    GroupModel.isActive = payload.isActive;
    try {
      return { result: await this.courseRepo.save(GroupModel) };
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
  ): Promise<PaginationResponse<CourseEntity[]>> {
    const page: number = payload.page || 1;
    const limit: number = payload.limit || 10;
    const count: number = await this.courseRepo.count();
    if (!count) return getPaginationResponse([], page, limit, count);
    const serverKeys = await this.courseRepo.find({
      where: {},
      skip: (page - 1) * limit,
      take: limit,
    });
    if (limit && !isNaN(page))
      return getPaginationResponse<CourseEntity>(
        serverKeys,
        page,
        limit,
        count,
      );
  }

  async findOne(body: ParamIdDto): Promise<SingleResponse<CourseEntity>> {
    const { id } = body;
    try {
      const objectId: ObjectId = new ObjectId(id);
      const teacher: CourseEntity = await this.courseRepo.findOne({
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
    payload: CourseUpdateDto,
  ): Promise<SingleResponse<CourseEntity>> {
    const { id } = payload;
    const objectId: ObjectId = new ObjectId(id);
    const TemplatePortion: CourseEntity = await this.courseRepo.findOne({
      where: { _id: objectId },
    });

    if (!TemplatePortion) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
    try {
      Object.entries(TemplatePortion).forEach(([key, value]) => {
        TemplatePortion[key] = payload[key] || value;
      });
      return { result: await this.courseRepo.save(TemplatePortion) };
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
    const teacher: CourseEntity = await this.courseRepo.findOne({
      where: { _id: objectId },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    teacher.deleted_at = new Date();
    await this.courseRepo.save(teacher);
  }
}
