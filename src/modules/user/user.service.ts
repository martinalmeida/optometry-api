import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createUser(data: User): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(id: number, data: User): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
