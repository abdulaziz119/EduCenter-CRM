import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsNotEmpty,
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
  birthDate: Date;
  @IsOptional()
  @IsString()
  groupId: string;
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
  @IsNotEmpty()
  first_name: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  last_name: string;
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  phone: number;
  @IsOptional()
  @IsDateString()
  birthDate: Date;
  @IsOptional()
  @IsString()
  groupId: string;
  @IsOptional()
  @IsBoolean()
  isPaid: boolean;
}
export interface SingleResponse<T> {
  result: T;
}
