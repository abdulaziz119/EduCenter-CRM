import {
  IsArray,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TeacherCreateDto {
  @IsDefined()
  @IsString()
  first_name: string;
  @IsDefined()
  @IsString()
  last_name: string;
  @IsDefined()
  @IsNumber()
  phone: number;
  @IsDefined()
  @IsString()
  birthDate: Date;
  @IsOptional()
  @IsArray()
  courses: number[];
}

export class TeacherUpdateDto {
  @IsDefined()
  id: number;
  @IsOptional()
  @IsNotEmpty()
  first_name: string;
  @IsOptional()
  @IsNotEmpty()
  last_name: string;
  @IsOptional()
  @IsNotEmpty()
  phone: number;
  @IsOptional()
  @IsNotEmpty()
  birthDate: Date;
  @IsOptional()
  @IsNotEmpty()
  courses: number[];
}
export interface SingleResponse<T> {
  result: T;
}
