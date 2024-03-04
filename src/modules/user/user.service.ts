import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';

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
    await this.prisma.users.create({
      data,
    });
    return {
      message: 'Usuario creado correctamente',
    };
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<object> {
    await this.prisma.users.update({
      data,
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
