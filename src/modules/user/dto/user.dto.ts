import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 191)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 191)
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 191)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 191)
  password: string;

  @IsNotEmpty()
  id_role: number;

  @IsNotEmpty()
  id_comp: number;
}
