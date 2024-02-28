import { Users } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getUserAuth(data: Users): Promise<object> {
    const findUser = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!findUser) return null;
    const contrast = await bcrypt.compare(data.password, findUser.password);
    if (!contrast) return null;
    else return { user: findUser, token: this.jwtService.sign(findUser) };
  }
}
