import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { compare, hash } from 'bcrypt';
import { type TokenObject } from './interfaces/auth';
import { dateTime } from '@helpers/dateTime';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async authUser(data: LoginUserDto): Promise<object> {
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
        user: findUser,
        token: this.jwtService.sign(findUser),
      };
  }

  async registerUser(data: RegisterUserDto): Promise<object> {
    const password = await hash(data.password, Number(process.env.SALT_ROUNDS));
    const createUser = await this.prisma.users.create({
      data: {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        password: password,
        created: dateTime(),
      },
    });
    return {
      user: createUser,
      token: this.jwtService.sign(createUser),
    };
  }

  async closeSession(tokenObject: TokenObject): Promise<object> {
    await this.prisma.blacklist.create({
      data: {
        token: tokenObject.token,
        created: dateTime(),
      },
    });
    return {
      message: 'Sesión cerrada',
    };
  }
}
