import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Length(0, 191)
  email: string;

  @IsNotEmpty()
  @Length(6, 191)
  password: string;
}
