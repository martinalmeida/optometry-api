import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly taskService: AuthService) {}

  @Post('login')
  async authenticate(@Body() loginUserDto: LoginUserDto) {
    const service = await this.taskService.getUserAuth(loginUserDto);
    if (service === null) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    } else {
      return service;
    }
  }
}
