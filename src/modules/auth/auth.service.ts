import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getUserAuth(data: LoginUserDto): Promise<object> {
    const findUser = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!findUser) return null;
    const contrast = await compare(data.password, findUser.password);
    if (!contrast) return null;
    else
      return {
        message: 'Bienvenido a Optometry',
        token: this.jwtService.sign(findUser),
      };
  }
}
