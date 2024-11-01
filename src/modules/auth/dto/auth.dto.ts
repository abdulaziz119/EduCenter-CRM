import {
  IsDefined,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCreateDto {
  @IsDefined()
  @IsNumber()
  phone: number;

  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  password: string;
}

export interface SingleResponse<T> {
  result: T;
}
