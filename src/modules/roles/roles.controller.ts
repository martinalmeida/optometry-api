import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      const createRole = await this.rolesService.create(createRoleDto);
      return createRole;
    } catch (error) {
      throw new NotFoundException('No se pudo crear el rol');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const roles = await this.rolesService.findAll();
      return roles;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error al obtener los roles');
    }
    return this.rolesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    try {
      const role = await this.rolesService.findOne(+id);
      return role;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error al obtener el rol');
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      const updateRole = await this.rolesService.update(+id, updateRoleDto);
      return updateRole;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error al actualizar el rol');
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async inativate(@Param('id') id: number) {
    try {
      return await this.rolesService.inactive(+id);
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error al inactivar el rol');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    try {
      return await this.rolesService.remove(+id);
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error al eliminar el rol');
    }
  }
}
