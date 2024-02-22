import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUserAuth(data: User): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        email: data.email,
        password: data.password,
      },
    });
  }
}
