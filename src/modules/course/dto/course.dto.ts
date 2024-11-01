import {
  IsBoolean,
  IsDefined,
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
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  description?: string;

  @IsOptional()
  @IsNumber()
  monthlyFee?: number;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export interface SingleResponse<T> {
  result: T;
}
