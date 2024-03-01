import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly taskService: AuthService) {}

  @Post('login')
  async authenticate(@Body() loginUserDto: LoginUserDto) {
    const service = await this.taskService.authUser(loginUserDto);
    if (service === null) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    } else {
      return service;
    }
  }

  @Post('register')
  async register(@Body() RegisterUserDto: RegisterUserDto) {
    const service = await this.taskService.registerUser(RegisterUserDto);
    if (service) {
      return service;
    } else {
      throw new UnauthorizedException('No se pudo registrar el usuario');
    }
  }
}
