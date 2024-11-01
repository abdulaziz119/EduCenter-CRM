import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class GroupCreateDto {
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;
  @IsDefined()
  @IsBoolean()
  isActive: boolean;
  @IsOptional()
  @IsString()
  courseId: string;
}

export class GroupUpdateDto {
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
  @IsBoolean()
  isActive: boolean;
  @IsOptional()
  @IsString()
  courseId: string;
}
export interface SingleResponse<T> {
  result: T;
}
