import { Users } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getUserAuth(data: Users): Promise<string> {
    const findUser = await this.prisma.users.findFirst({
      where: {
        email: data.email,
        password: data.password,
      },
    });
    if (!findUser) return null;
    if (data.password === findUser.password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
}
