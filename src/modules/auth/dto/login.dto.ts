import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 255)
  password: string;
}
