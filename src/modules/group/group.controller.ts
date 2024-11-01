import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PaginateParamsDto } from '../../utils/dto/paginate.dto';
import { PaginationResponse } from '../../utils/pagination.response';
import { ParamIdDto } from '../../utils/dto/params.dto';
import { GroupService } from './group.service';
import {
  GroupCreateDto,
  GroupUpdateDto,
  SingleResponse,
} from './dto/group.dto';
import { GroupEntity } from '../../entity/group.entity';

@Controller('/group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('/create')
  @HttpCode(201)
  async create(
    @Body() body: GroupCreateDto,
  ): Promise<SingleResponse<GroupEntity>> {
    return this.groupService.create(body);
  }

  @Post('/findAll')
  @HttpCode(200)
  async findAll(
    @Body() body: PaginateParamsDto,
  ): Promise<PaginationResponse<GroupEntity[]>> {
    return await this.groupService.findAll(body);
  }

  @Post('/findOne')
  @HttpCode(200)
  async findOne(
    @Body() body: ParamIdDto,
  ): Promise<SingleResponse<GroupEntity>> {
    return this.groupService.findOne(body);
  }

  @Post('/update')
  @HttpCode(202)
  async update(
    @Body() body: GroupUpdateDto,
  ): Promise<SingleResponse<GroupEntity>> {
    return this.groupService.update(body);
  }

  @Post('/remove')
  @HttpCode(204)
  async delete(@Body() body: ParamIdDto): Promise<any> {
    return this.groupService.delete(body);
  }
}
