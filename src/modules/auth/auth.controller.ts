// import { Body, Controller, HttpCode, Post } from '@nestjs/common';
// import { TeacherService } from './teacher.service';
// import { TeacherEntity } from '../../entity/teacher.entity';
//
// @Controller('login')
// export class AuthController {
//   constructor(private readonly teacherService: TeacherService) {}
//
//   @Post('/login')
//   @HttpCode(201)
//   async create(
//     @Body() body: TeacherCreateDto,
//   ): Promise<SingleResponse<TeacherEntity>> {
//     return this.teacherService.create(body);
//   }
// }
