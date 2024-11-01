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
import { TimetableEntity } from '../../entity/timetable.entity';
import {
  SingleResponse,
  TimetableCreateDto,
  TimetableUpdateDto,
} from './dto/timetable.dto';

@Injectable()
export class TimetableService {
  constructor(
    @Inject(MODELS.TIMETABLE)
    private readonly timetableRepo: Repository<TimetableEntity>,
  ) {}

  async create(
    payload: TimetableCreateDto,
  ): Promise<SingleResponse<TimetableEntity>> {
    const courseObjectId: ObjectId = new ObjectId(payload.courseId);
    const teacherObjectId: ObjectId = new ObjectId(payload.teacherId);
    const groupObjectId: ObjectId = new ObjectId(payload.groupId);

    const TimetableModel: TimetableEntity = new TimetableEntity();
    TimetableModel.date = payload.date;
    TimetableModel.startTime = payload.startTime;
    TimetableModel.endTime = payload.endTime;
    TimetableModel.courseId = courseObjectId;
    TimetableModel.teacherId = teacherObjectId;
    TimetableModel.groupId = groupObjectId;
    try {
      return { result: await this.timetableRepo.save(TimetableModel) };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to create a timetable entry',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    payload: PaginateParamsDto,
  ): Promise<PaginationResponse<TimetableEntity[]>> {
    const page: number = payload.page || 1;
    const limit: number = payload.limit || 10;
    const count: number = await this.timetableRepo.count();
    if (!count) return getPaginationResponse([], page, limit, count);
    const serverKeys = await this.timetableRepo.find({
      where: {},
      skip: (page - 1) * limit,
      take: limit,
    });
    if (limit && !isNaN(page))
      return getPaginationResponse<TimetableEntity>(
        serverKeys,
        page,
        limit,
        count,
      );
  }

  async findOne(body: ParamIdDto): Promise<SingleResponse<TimetableEntity>> {
    const { id } = body;
    try {
      const objectId: ObjectId = new ObjectId(id);
      const timetable: TimetableEntity = await this.timetableRepo.findOne({
        where: { _id: objectId },
      });
      if (!timetable) {
        throw new NotFoundException(`Timetable entry with ID ${id} not found`);
      }
      return { result: timetable };
    } catch (error) {
      throw new HttpException(
        { message: `Failed get with ID ${id}`, error: error.detail },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    payload: TimetableUpdateDto,
  ): Promise<SingleResponse<TimetableEntity>> {
    const { id } = payload;
    const objectId: ObjectId = new ObjectId(id);
    const TimetablePortion: TimetableEntity = await this.timetableRepo.findOne({
      where: { _id: objectId },
    });

    if (!TimetablePortion) {
      throw new NotFoundException(`Timetable entry with ID ${id} not found`);
    }
    try {
      Object.entries(TimetablePortion).forEach(([key, value]) => {
        TimetablePortion[key] = payload[key] || value;
      });
      return { result: await this.timetableRepo.save(TimetablePortion) };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to update the timetable entry',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(payload: ParamIdDto): Promise<void> {
    const { id } = payload;
    const objectId: ObjectId = new ObjectId(id);
    const timetable: TimetableEntity = await this.timetableRepo.findOne({
      where: { _id: objectId },
    });

    if (!timetable) {
      throw new NotFoundException('Timetable entry not found');
    }

    timetable.deleted_at = new Date();
    await this.timetableRepo.save(timetable);
  }
}
