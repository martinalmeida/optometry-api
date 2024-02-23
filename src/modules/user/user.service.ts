import { Users } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async getUserById(id: number): Promise<Users> {
    return this.prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createUser(data: Users): Promise<Users> {
    return this.prisma.users.create({
      data,
    });
  }

  async updateUser(id: number, data: Users): Promise<Users> {
    return this.prisma.users.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async deleteUser(id: number): Promise<Users> {
    return this.prisma.users.delete({
      where: {
        id: id,
      },
    });
  }
}
