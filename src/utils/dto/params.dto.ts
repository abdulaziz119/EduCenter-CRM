import { IsDefined, IsNumber, IsString } from 'class-validator';

export class ParamIdDto {
  @IsDefined()
  @IsString()
  id: string;
}

export class ParamUserIdDto {
  @IsDefined()
  user_id: number;
}
