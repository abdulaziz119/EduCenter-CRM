import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PaginateParamsDto } from '../../utils/dto/paginate.dto';
import { PaginationResponse } from '../../utils/pagination.response';
import { ParamIdDto } from '../../utils/dto/params.dto';
import { TimetableEntity } from '../../entity/timetable.entity';
import { TimetableService } from './timetable.service';
import {
  SingleResponse,
  TimetableCreateDto,
  TimetableUpdateDto,
} from './dto/timetable.dto';

@Controller('/timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Post('/create')
  @HttpCode(201)
  async create(
    @Body() body: TimetableCreateDto,
  ): Promise<SingleResponse<TimetableEntity>> {
    return this.timetableService.create(body);
  }

  @Post('/findAll')
  @HttpCode(200)
  async findAll(
    @Body() body: PaginateParamsDto,
  ): Promise<PaginationResponse<TimetableEntity[]>> {
    return await this.timetableService.findAll(body);
  }

  @Post('/findOne')
  @HttpCode(200)
  async findOne(
    @Body() body: ParamIdDto,
  ): Promise<SingleResponse<TimetableEntity>> {
    return this.timetableService.findOne(body);
  }

  @Post('/update')
  @HttpCode(202)
  async update(
    @Body() body: TimetableUpdateDto,
  ): Promise<SingleResponse<TimetableEntity>> {
    return this.timetableService.update(body);
  }

  @Post('/remove')
  @HttpCode(204)
  async delete(@Body() body: ParamIdDto): Promise<void> {
    return this.timetableService.delete(body);
  }
}
