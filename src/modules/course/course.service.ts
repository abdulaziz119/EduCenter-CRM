import {
  BadRequestException,
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
import { CourseEntity } from '../../entity/course.entity';
import {
  CourseCreateDto,
  CourseUpdateDto,
  SingleResponse,
} from './dto/course.dto';
import { GroupEntity } from '../../entity/group.entity';

@Injectable()
export class CourseService {
  constructor(
    @Inject(MODELS.COURSES)
    private readonly courseRepo: Repository<CourseEntity>,
    @Inject(MODELS.GROUPS)
    private readonly groupRepo: Repository<GroupEntity>,
  ) {}

  async create(
    payload: CourseCreateDto,
  ): Promise<SingleResponse<CourseEntity>> {
    const GroupModel: CourseEntity = new CourseEntity();
    GroupModel.name = payload.name;
    GroupModel.description = payload.description;
    GroupModel.monthlyFee = payload.monthlyFee;
    GroupModel.duration = payload.duration;
    GroupModel.isActive = payload.isActive;
    try {
      return { result: await this.courseRepo.save(GroupModel) };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to create a Course',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    payload: PaginateParamsDto,
  ): Promise<PaginationResponse<CourseEntity[]>> {
    const page: number = payload.page || 1;
    const limit: number = payload.limit || 10;
    const count: number = await this.courseRepo.count();

    if (count === 0) return getPaginationResponse([], page, limit, count);

    const serverKeys: CourseEntity[] = await this.courseRepo.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    const courseWithGroups = await Promise.all(
      serverKeys.map(async (course: CourseEntity) => {
        const group: GroupEntity[] = await this.groupRepo.find({
          where: { courseId: course._id },
        });

        return {
          ...course,
          group: group || null,
        };
      }),
    );

    return getPaginationResponse<CourseEntity>(
      courseWithGroups,
      page,
      limit,
      count,
    );
  }

  async findOne(
    body: ParamIdDto,
  ): Promise<SingleResponse<CourseEntity & { group?: GroupEntity[] | null }>> {
    const { id } = body;

    try {
      if (!ObjectId.isValid(id)) {
        throw new BadRequestException(`Invalid ID format: ${id}`);
      }

      const objectId: ObjectId = new ObjectId(id);
      const course: CourseEntity = await this.courseRepo.findOne({
        where: { _id: objectId },
      });

      if (!course) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }

      const group: GroupEntity[] = await this.groupRepo.find({
        where: { courseId: objectId },
      });

      return {
        result: {
          ...course,
          group: group || null,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: `Failed to get course with ID ${id}`, error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    payload: CourseUpdateDto,
  ): Promise<SingleResponse<CourseEntity>> {
    const { id } = payload;
    const objectId: ObjectId = new ObjectId(id);
    const CoursePortion: CourseEntity = await this.courseRepo.findOne({
      where: { _id: objectId },
    });

    if (!CoursePortion) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    try {
      Object.entries(CoursePortion).forEach(([key, value]) => {
        CoursePortion[key] = payload[key] || value;
      });
      return { result: await this.courseRepo.save(CoursePortion) };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to update the Course',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(payload: ParamIdDto): Promise<any> {
    const { id } = payload;
    const objectId: ObjectId = new ObjectId(id);
    const course: CourseEntity = await this.courseRepo.findOne({
      where: { _id: objectId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    course.deleted_at = new Date();
    await this.courseRepo.save(course);
  }
}
