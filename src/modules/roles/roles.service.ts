import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) { }
  async create(createRoleDto: CreateRoleDto) {
    try {
      const { name } = createRoleDto;
      const data = { name, created: new Date() };
      const createRole = await this.prisma.roles.create({ data });
      if (!createRole) { throw new Error('No se pudo crear el rol'); }
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
      const role = await this.prisma.roles.findUnique({ where: { id, deleted: null, }, });
      if (!role) { return { message: `El rol con ID ${id} no fue encontrada. ☣️` } }
      return { role: role };
    } catch (error) {
      return { error: error.message };
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const { name } = updateRoleDto;
      const data = { name, updated: new Date() };
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
      if (!role) { return { message: `El rol con ID ${id} no fue encontrada. ☣️` }; }
      const newStatus = !role.status;
      role.status = newStatus;
      role.updated = new Date();
      const inativateRole = await this.prisma.roles.update({ where: { id }, data: role });
      if (!inativateRole) { throw new Error(`El rol con ID ${id} no pudo ser inactivada. ☣️`); }
      return { message: `La rol con ID ${id} fue inactivada. ☣️` };
    } catch (error) {
      return { error: error.message };
    }
  }

  async remove(id: number) {
    try {
      const role = await this.prisma.roles.findUnique({ where: { id }, });
      if (!role) { throw new Error(`El rol con ID ${id} no fue encontrada. ☣️`); }
      const deletedRole = await this.prisma.roles.update({ where: { id }, data: { deleted: new Date() } });
      if (!deletedRole) { throw new Error(`El rol con ID ${id} no pudo ser eliminada. ☣️`); }
      return { message: `El rol con ID ${id} fue eliminada. ☣️` };
    } catch (error) {
      return { error: error.message };
    }
  }
}
