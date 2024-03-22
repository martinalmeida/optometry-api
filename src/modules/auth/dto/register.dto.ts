import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 255)
  password: string;

  @IsNotEmpty()
  id_role: number;

  @IsNotEmpty()
  id_comp: number;
}
