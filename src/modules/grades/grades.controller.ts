import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PaginateParamsDto } from '../../utils/dto/paginate.dto';
import { PaginationResponse } from '../../utils/pagination.response';
import { ParamIdDto } from '../../utils/dto/params.dto';
import { GradesService } from './grades.service';
import {
  GradesCreateDto,
  GradesUpdateDto,
  SingleResponse,
} from './dto/grades.dto';
import { GradesEntity } from '../../entity/grades.entity';

@Controller('/grade')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post('/create')
  @HttpCode(201)
  async create(
    @Body() body: GradesCreateDto,
  ): Promise<SingleResponse<GradesEntity>> {
    return this.gradesService.create(body);
  }

  @Post('/findAll')
  @HttpCode(200)
  async findAll(
    @Body() body: PaginateParamsDto,
  ): Promise<PaginationResponse<GradesEntity[]>> {
    return await this.gradesService.findAll(body);
  }

  @Post('/findOne')
  @HttpCode(200)
  async findOne(
    @Body() body: ParamIdDto,
  ): Promise<SingleResponse<GradesEntity>> {
    return this.gradesService.findOne(body);
  }

  @Post('/update')
  @HttpCode(202)
  async update(
    @Body() body: GradesUpdateDto,
  ): Promise<SingleResponse<GradesEntity>> {
    return this.gradesService.update(body);
  }

  @Post('/remove')
  @HttpCode(204)
  async delete(@Body() body: ParamIdDto): Promise<any> {
    return this.gradesService.delete(body);
  }
}
