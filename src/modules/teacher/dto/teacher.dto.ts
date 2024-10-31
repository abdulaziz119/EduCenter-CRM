import {
  IsArray,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class TeacherCreateDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;
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
  @IsPhoneNumber('UZ')
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
