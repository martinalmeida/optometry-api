import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { dateTime } from '@helpers/dateTime';
import * as moment from 'moment-timezone';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getAllUsers(): Promise<object> {
    try {
      const users = await this.prisma.users.findMany({ select: { id: true, name: true, lastname: true, email: true, status: true }, where: { deleted: null } });
      if (!users || users.length === 0) { throw new Error(`No se encontraron usuarios.`); }
      return { users: users };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getUserById(id: number): Promise<object> {
    try {
      const userById = await this.prisma.users.findUnique({
        where: { id: id, deleted: null },
        select: { id: true, name: true, lastname: true, email: true, status: true }
      });
      if (!userById) { throw new Error(`Usuario con ID ${id} no encontrado.`); }
      return { userById: userById };
    } catch (error) {
      return { error: error.message };
    }
  }

  async createUser(data: UserDto): Promise<object> {
    const password = await hash(data.password, Number(process.env.SALT_ROUNDS));
    try {
      const user = await this.prisma.users.findUnique({ where: { email: data.email } });
      if (user) { throw new Error(`El usuario ${data.email} ya existe.`); }
      const newUser = { name: data.name, lastname: data.lastname, email: data.email, password: password, created: moment().tz('America/Bogota').format(), };
      await this.prisma.users.create({ data: newUser, });
      return { message: 'Usuario creado correctamente. 👌', };
    } catch (error) {
      return { error: error.message };
    }
  }

  async updateUser(id: number, data: UserDto): Promise<object> {
    const password = await hash(data.password, Number(process.env.SALT_ROUNDS));
    try {
      const user = await this.prisma.users.findUnique({ where: { id: Number(id) }, });
      if (!user) { throw new Error(`Usuario con ID ${id} no encontrado.`); }
      await this.prisma.users.update({
        where: { id: id },
        data: {
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          password: data.password ? await hash(data.password, Number(process.env.SALT_ROUNDS)) : undefined,
          updated: new Date(), // Actualizar la fecha de actualización
        }
      });
      return { message: 'Usuario actualizado correctamente. 👌' };
    } catch (error) {
      return { error: error.message };
    }
  }

  async inactivateUser(id: number): Promise<object> {
    try {
      const user = await this.prisma.users.findUnique({ where: { id }, });
      if (!user) { throw new Error(`Usuario con ID ${id} no encontrado.`); }
      const newStatus = !user.status;
      const updatedUser = await this.prisma.users.update({ where: { id }, data: { status: newStatus, updated: new Date() }, });
      return { user: updatedUser };
    } catch (error) {
      return { error: error.message };
    }
  }


  async deleteUser(id: number): Promise<object> {
    try {
      const deletedUser = await this.prisma.users.findUnique({ where: { id }, });
      if (!deletedUser) { throw new Error(`Usuario con ID ${id} no encontrado.`); }
      //await this.prisma.users.delete({ where: { id } });
      return { message: 'Usuario eliminado correctamente. 🪥🫧🧽' };
    } catch (error) {
      return { error: error.message };
    }
  }
}
