import { IsDefined, IsOptional, IsString, IsDateString } from 'class-validator';

export class TimetableCreateDto {
  @IsDefined()
  @IsDateString()
  date: Date;

  @IsDefined()
  @IsDateString()
  startTime: Date;

  @IsDefined()
  @IsDateString()
  endTime: Date;

  @IsDefined()
  @IsString()
  groupId: string;

  @IsDefined()
  @IsString()
  teacherId: string;

  @IsDefined()
  @IsString()
  courseId: string;
}

export class TimetableUpdateDto {
  @IsDefined()
  @IsString()
  id: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsString()
  groupId?: string;

  @IsOptional()
  @IsString()
  teacherId?: string;

  @IsOptional()
  @IsString()
  courseId?: string;
}

export interface SingleResponse<T> {
  result: T;
}
