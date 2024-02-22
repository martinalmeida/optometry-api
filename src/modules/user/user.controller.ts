import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const userFound = await this.userService.getUserById(Number(id));
    if (!userFound) throw new NotFoundException('User does not exist');
    return userFound;
  }

  @Post()
  async createUser(@Body() data: User) {
    return this.userService.createUser(data);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: User) {
    try {
      return await this.userService.updateUser(Number(id), data);
    } catch (error) {
      throw new NotFoundException('User does not exist');
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.userService.deleteUser(Number(id));
    } catch (error) {
      throw new NotFoundException('User does not exist');
    }
  }
}
