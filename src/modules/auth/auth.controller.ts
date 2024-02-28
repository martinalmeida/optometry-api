import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly taskService: AuthService) {}

  @Post('login')
  async authenticate(@Body() data: Users) {
    const service = await this.taskService.getUserAuth(data);
    if (service === null) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    } else {
      return service;
    }
  }

  @Post('register')
  async create(@Body() data: Users) {
    try {
      return await this.taskService.getUserAuth(data);
    } catch (error) {
      throw new NotFoundException('User does not exist');
    }
  }
}
