import { Users } from '@prisma/client';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  validate(data: Users) {
    const user = this.authService.getUserAuth(data);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
