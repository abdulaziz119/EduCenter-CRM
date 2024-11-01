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
import { GroupEntity } from '../../entity/group.entity';
import {
  GroupCreateDto,
  GroupUpdateDto,
  SingleResponse,
} from './dto/group.dto';

@Injectable()
export class GroupService {
  constructor(
    @Inject(MODELS.GROUPS)
    private readonly groupRepo: Repository<GroupEntity>,
  ) {}

  async create(payload: GroupCreateDto): Promise<SingleResponse<GroupEntity>> {
    const objectId: ObjectId = new ObjectId(payload.courseId);
    const GroupModel: GroupEntity = new GroupEntity();
    GroupModel.name = payload.name;
    GroupModel.isActive = payload.isActive;
    GroupModel.courseId = objectId;
    try {
      return { result: await this.groupRepo.save(GroupModel) };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to create the group',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    payload: PaginateParamsDto,
  ): Promise<PaginationResponse<GroupEntity[]>> {
    const page: number = payload.page || 1;
    const limit: number = payload.limit || 10;
    const count: number = await this.groupRepo.count();
    if (!count) return getPaginationResponse([], page, limit, count);
    const serverKeys = await this.groupRepo.find({
      where: {},
      skip: (page - 1) * limit,
      take: limit,
    });
    if (limit && !isNaN(page))
      return getPaginationResponse<GroupEntity>(serverKeys, page, limit, count);
  }

  async findOne(body: ParamIdDto): Promise<SingleResponse<GroupEntity>> {
    const { id } = body;
    try {
      const objectId: ObjectId = new ObjectId(id);
      const group: GroupEntity = await this.groupRepo.findOne({
        where: { _id: objectId },
      });
      if (!group) {
        throw new NotFoundException(`Group with ID ${id} not found`);
      }
      return { result: group };
    } catch (error) {
      throw new HttpException(
        { message: `Failed get with ID ${id}`, error: error.detail },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(payload: GroupUpdateDto): Promise<SingleResponse<GroupEntity>> {
    const { id } = payload;
    const objectId: ObjectId = new ObjectId(id);
    const GroupPortion: GroupEntity = await this.groupRepo.findOne({
      where: { _id: objectId },
    });

    if (!GroupPortion) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    try {
      Object.entries(GroupPortion).forEach(([key, value]) => {
        GroupPortion[key] = payload[key] || value;
      });
      return { result: await this.groupRepo.save(GroupPortion) };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to update the group',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(payload: ParamIdDto): Promise<any> {
    const { id } = payload;
    const objectId: ObjectId = new ObjectId(id);
    const teacher: GroupEntity = await this.groupRepo.findOne({
      where: { _id: objectId },
    });

    if (!teacher) {
      throw new NotFoundException('Group not found');
    }

    teacher.deleted_at = new Date();
    await this.groupRepo.save(teacher);
  }
}
