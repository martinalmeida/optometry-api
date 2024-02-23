import { Body, Controller, Post, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly taskService: AuthService) {}

  @Post()
  async authenticate(@Body() data: Users) {
    try {
      return await this.taskService.getUserAuth(data);
    } catch (error) {
      throw new NotFoundException('User does not exist');
    }
  }
}
