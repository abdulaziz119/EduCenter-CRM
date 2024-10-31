import { IsDefined } from 'class-validator';

export class PaginateParamsDto {
  @IsDefined()
  page: number;
  @IsDefined()
  limit: number;
}
