import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PaginateParamsDto } from '../../utils/dto/paginate.dto';
import { PaginationResponse } from '../../utils/pagination.response';
import { ParamIdDto } from '../../utils/dto/params.dto';
import {
  CourseCreateDto,
  CourseUpdateDto,
  SingleResponse,
} from './dto/course.dto';
import { CourseService } from './course.service';
import { CourseEntity } from '../../entity/course.entity';

@Controller('/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('/create')
  @HttpCode(201)
  async create(
    @Body() body: CourseCreateDto,
  ): Promise<SingleResponse<CourseEntity>> {
    return this.courseService.create(body);
  }

  @Post('/findAll')
  @HttpCode(200)
  async findAll(
    @Body() body: PaginateParamsDto,
  ): Promise<PaginationResponse<CourseEntity[]>> {
    return await this.courseService.findAll(body);
  }

  @Post('/findOne')
  @HttpCode(200)
  async findOne(
    @Body() body: ParamIdDto,
  ): Promise<SingleResponse<CourseEntity>> {
    return this.courseService.findOne(body);
  }

  @Post('/update')
  @HttpCode(202)
  async update(
    @Body() body: CourseUpdateDto,
  ): Promise<SingleResponse<CourseEntity>> {
    return this.courseService.update(body);
  }

  @Post('/remove')
  @HttpCode(204)
  async delete(@Body() body: ParamIdDto): Promise<any> {
    return this.courseService.delete(body);
  }
}
