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
import { PaymentEntity } from '../../entity/payment.entity';
import {
  PaymentCreateDto,
  PaymentUpdateDto,
  SingleResponse,
} from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(MODELS.PAYMENTS)
    private readonly paymentRepo: Repository<PaymentEntity>,
  ) {}

  async create(
    payload: PaymentCreateDto,
  ): Promise<SingleResponse<PaymentEntity>> {
    const studentObjectId: ObjectId = new ObjectId(payload.studentId);
    const courseObjectId: ObjectId = new ObjectId(payload.courseId);
    const GradeModel: PaymentEntity = new PaymentEntity();
    GradeModel.grade = payload.grade;
    GradeModel.date = payload.date;
    GradeModel.studentId = studentObjectId;
    GradeModel.courseId = courseObjectId;
    try {
      return { result: await this.paymentRepo.save(GradeModel) };
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
  ): Promise<PaginationResponse<PaymentEntity[]>> {
    const page: number = payload.page || 1;
    const limit: number = payload.limit || 10;
    const count: number = await this.paymentRepo.count();
    if (!count) return getPaginationResponse([], page, limit, count);
    const serverKeys = await this.paymentRepo.find({
      where: {},
      skip: (page - 1) * limit,
      take: limit,
    });
    if (limit && !isNaN(page))
      return getPaginationResponse<PaymentEntity>(
        serverKeys,
        page,
        limit,
        count,
      );
  }

  async findOne(body: ParamIdDto): Promise<SingleResponse<PaymentEntity>> {
    const { id } = body;
    try {
      const objectId: ObjectId = new ObjectId(id);
      const grade: PaymentEntity = await this.paymentRepo.findOne({
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
    payload: PaymentUpdateDto,
  ): Promise<SingleResponse<PaymentEntity>> {
    const { id } = payload;
    const objectId: ObjectId = new ObjectId(id);
    const GradePortion: PaymentEntity = await this.paymentRepo.findOne({
      where: { _id: objectId },
    });

    if (!GradePortion) {
      throw new NotFoundException(`Grade with ID ${id} not found`);
    }
    try {
      Object.entries(GradePortion).forEach(([key, value]) => {
        GradePortion[key] = payload[key] || value;
      });
      return { result: await this.paymentRepo.save(GradePortion) };
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
    const garde: PaymentEntity = await this.paymentRepo.findOne({
      where: { _id: objectId },
    });

    if (!garde) {
      throw new NotFoundException('Grade not found');
    }

    garde.deleted_at = new Date();
    await this.paymentRepo.save(garde);
  }
}
