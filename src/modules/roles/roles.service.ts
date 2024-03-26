import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../../prisma/prisma.service';
import moment from 'moment-timezone';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) { }
  async create(createRoleDto: CreateRoleDto): Promise<object> {
    try {
      //const { name } = createRoleDto;
      //const data = { name, created: new Date() };
      const createRole = await this.prisma.roles.create({ data: { ...createRoleDto, created: moment().tz('America/Bogota').format(), }, });
      if (!createRole) { throw new Error(`Rol con Nombre ${createRoleDto.name} no pudo ser creado. 🏭`); }
      return { createRole: createRole };
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAll() {
    try {
      const roles = await this.prisma.roles.findMany();
      if (!roles || roles.length === 0) return { message: `No se encontraron roles. 🏭` }
      return { roles: roles };
    } catch (error) {
      return { error: error.message };
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.prisma.roles.findUnique({ where: { id }, });
      if (!role) { return { message: `El rol con ID ${id} no fue encontrada. ☣️` } }
      return { role: role };
    } catch (error) {
      return { error: error.message };
    }
  }

  async update(id: number, data: UpdateRoleDto) {
    try {
      const role = await this.prisma.roles.findUnique({ where: { id }, });
      if (!role) { return { message: `El rol con ID ${id} no fue encontrada. ☣️` }; }
      const updatedRole = await this.prisma.roles.update({ where: { id }, data });
      if (!updatedRole) { throw new Error(`El rol con ID ${id} no pudo ser actualizada. ☣️`); }
      return { updatedRole: updatedRole };
    } catch (error) {
      return { error: error.message };
    }
  }

  async inactive(id: number) {
    try {
      const role = await this.prisma.roles.findUnique({ where: { id }, });
      if (!role) { return { message: `Rol con ID ${id} no encontrada. ☣️` }; }
      const newStatus = !role.status;
      role.status = newStatus;
      //role.updated = new Date();
      const inativateRole = await this.prisma.roles.update({ where: { id }, data: role });
      if (!inativateRole) { throw new Error(`El rol con ID ${id} no pudo ser inactivada. ☣️`); }
      return { message: `Rol con ID ${id} inactivada correctamente. 📄` };
    } catch (error) {
      return { error: error.message };
    }
  }

  async remove(id: number) {
    try {
      const role = await this.prisma.roles.findUnique({ where: { id }, });
      if (!role) { throw new Error(`Rol con ID ${id} no encontrada. ☣️`); }
      // const deletedRole = await this.prisma.roles.delete({ where: { id }, });
      // if (!deletedRole) { throw new Error(`Rol con ID ${id} no pudo ser eliminada. ☣️`); }
      return { message: `Rol eliminado correctamente. ❌` };
    } catch (error) {
      return { error: error.message };
    }
  }
}
