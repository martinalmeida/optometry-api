import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException, UseGuards, Patch, UnauthorizedException, } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: UserDto) {
    try {
      const user = await this.userService.create(data);
      return user;
    } catch (error) {
      throw new NotFoundException('No se pudo crear el usuario');
    }
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const users = await this.userService.findAll();
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
  async findOne(@Param('id') id: number) {
    try {
      const userFound = await this.userService.findOne(Number(id));
      if (!userFound) throw new NotFoundException('No se encontro el usuario');
      return userFound;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido un error al obtener los usuarios',
      );
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() data: UserDto) {
    try {
      const updatedUser = await this.userService.update(+id, data);
      return updatedUser;
    } catch (error) {
      throw new NotFoundException('No se pudo actualizar el usuario');
    }
  }

  @Patch('inactivate/:id')
  @UseGuards(JwtAuthGuard)
  async inativate(@Param('id') id: number) {
    try {
      return await this.userService.inativate(+id);
    } catch (error) {
      throw new NotFoundException('No se pudo inactivar el usuario');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    try {
      return await this.userService.remove(Number(id));
    } catch (error) {
      throw new NotFoundException('No se pudo eliminar el usuario');
    }
  }
}
