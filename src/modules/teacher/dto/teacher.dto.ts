import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class TeacherCreateDto {
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
}

export class TeacherUpdateDto {
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
  groupId: number;
}
export interface SingleResponse<T> {
  result: T;
}
