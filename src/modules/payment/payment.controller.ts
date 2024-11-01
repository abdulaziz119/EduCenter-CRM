import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PaginateParamsDto } from '../../utils/dto/paginate.dto';
import { PaginationResponse } from '../../utils/pagination.response';
import { ParamIdDto } from '../../utils/dto/params.dto';
import {
  PaymentCreateDto,
  PaymentUpdateDto,
  SingleResponse,
} from './dto/payment.dto';
import { PaymentService } from './payment.service';
import { PaymentEntity } from '../../entity/payment.entity';

@Controller('/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/create')
  @HttpCode(201)
  async create(
    @Body() body: PaymentCreateDto,
  ): Promise<SingleResponse<PaymentEntity>> {
    return this.paymentService.create(body);
  }

  @Post('/findAll')
  @HttpCode(200)
  async findAll(
    @Body() body: PaginateParamsDto,
  ): Promise<PaginationResponse<PaymentEntity[]>> {
    return await this.paymentService.findAll(body);
  }

  @Post('/findOne')
  @HttpCode(200)
  async findOne(
    @Body() body: ParamIdDto,
  ): Promise<SingleResponse<PaymentEntity>> {
    return this.paymentService.findOne(body);
  }

  @Post('/update')
  @HttpCode(202)
  async update(
    @Body() body: PaymentUpdateDto,
  ): Promise<SingleResponse<PaymentEntity>> {
    return this.paymentService.update(body);
  }

  @Post('/remove')
  @HttpCode(204)
  async delete(@Body() body: ParamIdDto): Promise<any> {
    return this.paymentService.delete(body);
  }
}
