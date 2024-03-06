import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { json } from 'stream/consumers';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<object> {
    return this.prisma.users.findMany({
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        status: true,
      },
    });
  }

  async getUserById(id: number): Promise<object> {
    return this.prisma.users.findUnique({
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        status: true,
      },
      where: {
        id: Number(id),
      },
    });
  }

  async createUser(data: CreateUserDto): Promise<object> {
    const password = await hash(data.password, Number(process.env.SALT_ROUNDS));
    const user = {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: password,
    };
    await this.prisma.users.create({
      data: user,
    });
    return {
      message: 'Usuario creado correctamente',
    };
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<object> {
    const password = await hash(data.password, Number(process.env.SALT_ROUNDS));
    const user = {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: password,
    };
    await this.prisma.users.update({
      data: user,
      where: { id: Number(id) },
    });
    return { message: 'Usuario actualizado correctamente' };
  }

  async deleteUser(id: number): Promise<object> {
    await this.prisma.users.delete({
      where: {
        id: Number(id),
      },
    });
    return {
      message: 'Usuario eliminado correctamente',
    };
  }
}
