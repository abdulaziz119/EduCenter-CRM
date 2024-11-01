import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class StudentCreateDto {
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  first_name: string;

  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  last_name: string;

  @IsDefined()
  @IsNumber()
  phone: number;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @IsDefined()
  @IsDateString()
  birthDate: Date;

  @IsOptional()
  @IsString()
  groupId?: string;

  @IsDefined()
  @IsBoolean()
  isPaid: boolean;
}

export class StudentUpdateDto {
  @IsDefined()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  first_name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  last_name?: string;

  @IsOptional()
  @IsNumber()
  phone?: number;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  groupId?: string;

  @IsOptional()
  @IsBoolean()
  isPaid?: boolean;
}

export interface SingleResponse<T> {
  result: T;
}
