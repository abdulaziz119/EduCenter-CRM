import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class TimetableCreateDto {
  @IsDefined()
  @IsString()
  date: Date;
  @IsDefined()
  @IsString()
  startTime: Date;
  @IsDefined()
  @IsString()
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
  @IsNotEmpty()
  @IsString()
  date: Date;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  startTime: Date;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  endTime: Date;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  groupId: Date;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  teacherId: Date;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  courseId: Date;
}
export interface SingleResponse<T> {
  result: T;
}
