import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string) {
    const userFound = await this.userService.getUserById(Number(id));
    if (!userFound) throw new NotFoundException('User does not exist');
    return userFound;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() data: Users) {
    return this.userService.createUser(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id') id: string, @Body() data: Users) {
    try {
      return await this.userService.updateUser(Number(id), data);
    } catch (error) {
      throw new NotFoundException('User does not exist');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.userService.deleteUser(Number(id));
    } catch (error) {
      throw new NotFoundException('User does not exist');
    }
  }
}
