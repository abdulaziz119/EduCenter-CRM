import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherEntity } from '../../entity/teacher.entity';
import {
  SingleResponse,
  TeacherCreateDto,
  TeacherUpdateDto,
} from './dto/teacher.dto';
import { UpdateResult } from 'mongodb';
import { PaginateParamsDto } from '../../utils/dto/paginate.dto';
import { PaginationResponse } from '../../utils/pagination.response';
import { ParamIdDto } from '../../utils/dto/params.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('/create')
  @HttpCode(201)
  async create(
    @Body() body: TeacherCreateDto,
  ): Promise<SingleResponse<TeacherEntity>> {
    return this.teacherService.create(body);
  }

  @Post('/findAll')
  @HttpCode(200)
  async findAll(
    @Body() body: PaginateParamsDto,
  ): Promise<PaginationResponse<TeacherEntity[]>> {
    return await this.teacherService.findAll(body);
  }

  @Post('/findOne')
  @HttpCode(200)
  async findOne(
    @Body() body: ParamIdDto,
  ): Promise<SingleResponse<TeacherEntity>> {
    return this.teacherService.findOne(body);
  }

  @Post('/update')
  @HttpCode(202)
  async update(
    @Body() body: TeacherUpdateDto,
  ): Promise<SingleResponse<TeacherEntity>> {
    return this.teacherService.update(body);
  }

  @Post('/remove')
  @HttpCode(204)
  async delete(@Body() body: ParamIdDto): Promise<UpdateResult> {
    return this.teacherService.delete(body);
  }
}
