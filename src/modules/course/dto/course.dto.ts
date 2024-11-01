import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CourseCreateDto {
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  description: string;
  @IsDefined()
  @IsNumber()
  monthlyFee: number;
  @IsDefined()
  @IsString()
  duration: string;
  @IsDefined()
  @IsBoolean()
  isActive: boolean;
}

export class CourseUpdateDto {
  @IsDefined()
  @IsString()
  id: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  description: string;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  monthlyFee: number;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  duration: string;
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
export interface SingleResponse<T> {
  result: T;
}
