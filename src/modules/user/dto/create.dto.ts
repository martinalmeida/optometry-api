import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(1, 191)
  name: string;

  @IsNotEmpty()
  @Length(0, 191)
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 191)
  email: string;

  @IsNotEmpty()
  @Length(6, 191)
  password: string;
}
