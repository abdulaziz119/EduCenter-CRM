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
import { GradesEntity } from '../../entity/grades.entity';
import {
  GradesCreateDto,
  GradesUpdateDto,
  SingleResponse,
} from './dto/grades.dto';

@Injectable()
export class GradesService {
  constructor(
    @Inject(MODELS.GRADES)
    private readonly gradesRepo: Repository<GradesEntity>,
  ) {}

  async create(
    payload: GradesCreateDto,
  ): Promise<SingleResponse<GradesEntity>> {
    const objectId: ObjectId = new ObjectId(payload.studentId);

    const GradeModel: GradesEntity = new GradesEntity();
    GradeModel.amount = payload.amount;
    GradeModel.paymentMethod = payload.paymentMethod;
    GradeModel.studentId = objectId;
    try {
      return { result: await this.gradesRepo.save(GradeModel) };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to create the grade',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    payload: PaginateParamsDto,
  ): Promise<PaginationResponse<GradesEntity[]>> {
    const page: number = payload.page || 1;
    const limit: number = payload.limit || 10;
    const count: number = await this.gradesRepo.count();
    if (!count) return getPaginationResponse([], page, limit, count);
    const serverKeys = await this.gradesRepo.find({
      where: {},
      skip: (page - 1) * limit,
      take: limit,
    });
    if (limit && !isNaN(page))
      return getPaginationResponse<GradesEntity>(
        serverKeys,
        page,
        limit,
        count,
      );
  }

  async findOne(body: ParamIdDto): Promise<SingleResponse<GradesEntity>> {
    const { id } = body;
    try {
      const objectId: ObjectId = new ObjectId(id);
      const grade: GradesEntity = await this.gradesRepo.findOne({
        where: { _id: objectId },
      });
      if (!grade) {
        throw new NotFoundException(`Grade with ID ${id} not found`);
      }
      return { result: grade };
    } catch (error) {
      throw new HttpException(
        { message: `Failed get with ID ${id}`, error: error.detail },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    payload: GradesUpdateDto,
  ): Promise<SingleResponse<GradesEntity>> {
    const { id } = payload;
    const objectId: ObjectId = new ObjectId(id);
    const GradePortion: GradesEntity = await this.gradesRepo.findOne({
      where: { _id: objectId },
    });

    if (!GradePortion) {
      throw new NotFoundException(`Grade with ID ${id} not found`);
    }
    try {
      Object.entries(GradePortion).forEach(([key, value]) => {
        GradePortion[key] = payload[key] || value;
      });
      return { result: await this.gradesRepo.save(GradePortion) };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to update the garde',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(payload: ParamIdDto): Promise<any> {
    const { id } = payload;
    const objectId: ObjectId = new ObjectId(id);
    const garde: GradesEntity = await this.gradesRepo.findOne({
      where: { _id: objectId },
    });

    if (!garde) {
      throw new NotFoundException('Grade not found');
    }

    garde.deleted_at = new Date();
    await this.gradesRepo.save(garde);
  }
}
