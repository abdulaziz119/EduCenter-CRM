import {
  IsDateString,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PaymentCreateDto {
  @IsDefined()
  @IsNumber()
  grade: number;

  @IsDefined()
  @IsDateString()
  date: Date;

  @IsDefined()
  @IsString()
  studentId: string;

  @IsDefined()
  @IsString()
  courseId: string;
}

export class PaymentUpdateDto {
  @IsDefined()
  @IsString()
  id: string;

  @IsOptional()
  @IsNumber()
  grade: number;

  @IsOptional()
  @IsDateString()
  date: Date;

  @IsOptional()
  @IsString()
  studentId: string;

  @IsOptional()
  @IsString()
  courseId: string;
}

export interface SingleResponse<T> {
  result: T;
}
