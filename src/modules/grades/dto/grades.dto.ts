import {
  IsDateString,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GradesCreateDto {
  @IsDefined()
  @IsNumber()
  amount: number;

  @IsDefined()
  @IsString()
  studentId: string;

  @IsDefined()
  @IsDateString()
  paymentMethod: Date;
}

export class GradesUpdateDto {
  @IsDefined()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  studentId: string;

  @IsOptional()
  @IsDateString()
  paymentMethod: Date;
}

export interface SingleResponse<T> {
  result: T;
}
