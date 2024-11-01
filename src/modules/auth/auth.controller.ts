import { Body, Controller, HttpCode, Headers, Post } from '@nestjs/common';
import { AuthCreateDto } from './dto/auth.dto';
import { AuthorizationService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthorizationService) {}

  @Post('/login')
  @HttpCode(200)
  async create(@Body() body: AuthCreateDto, @Headers() headers): Promise<any> {
    return this.authService.verify(body, headers.token);
  }
}
