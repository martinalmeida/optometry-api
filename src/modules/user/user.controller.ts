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
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    try {
      const users = await this.userService.getAllUsers();
      if (!users) throw new NotFoundException('No se encontraron usuarios');
      return users;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido un error al obtener los usuarios',
      );
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: number) {
    try {
      const userFound = await this.userService.getUserById(Number(id));
      if (!userFound) throw new NotFoundException('No se encontro el usuario');
      return userFound;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido un error al obtener los usuarios',
      );
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() data: CreateUserDto) {
    try {
      const user = await this.userService.createUser(data);
      return user;
    } catch (error) {
      throw new NotFoundException('No se pudo crear el usuario');
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id') id: number, @Body() data: UpdateUserDto) {
    try {
      const updatedUser = await this.userService.updateUser(id, data);
      return updatedUser;
    } catch (error) {
      throw new NotFoundException('No se pudo actualizar el usuario');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: number) {
    try {
      return await this.userService.deleteUser(Number(id));
    } catch (error) {
      throw new NotFoundException('No se pudo eliminar el usuario');
    }
  }
}
