import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { TeacherEntity } from '../../entity/teacher.entity';
import { PaginateParamsDto } from '../../utils/dto/paginate.dto';
import { PaginationResponse } from '../../utils/pagination.response';
import { ParamIdDto } from '../../utils/dto/params.dto';
import { StudentService } from './student.service';
import {
  SingleResponse,
  StudentCreateDto,
  StudentUpdateDto,
} from './dto/student.dto';
import { ObjectId } from 'mongodb';

@Controller('/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/register')
  @HttpCode(201)
  async create(
    @Body() body: StudentCreateDto,
  ): Promise<SingleResponse<{ id: ObjectId; token: string }>> {
    return this.studentService.create(body);
  }

  @Post('/findAll')
  @HttpCode(200)
  async findAll(
    @Body() body: PaginateParamsDto,
  ): Promise<PaginationResponse<TeacherEntity[]>> {
    return await this.studentService.findAll(body);
  }

  @Post('/findOne')
  @HttpCode(200)
  async findOne(
    @Body() body: ParamIdDto,
  ): Promise<SingleResponse<TeacherEntity>> {
    return this.studentService.findOne(body);
  }

  @Post('/update')
  @HttpCode(202)
  async update(
    @Body() body: StudentUpdateDto,
  ): Promise<SingleResponse<TeacherEntity>> {
    return this.studentService.update(body);
  }

  @Post('/remove')
  @HttpCode(204)
  async delete(@Body() body: ParamIdDto): Promise<any> {
    return this.studentService.delete(body);
  }
}
