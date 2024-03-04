import { IsString, IsEmail, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name?: string;

  @IsString()
  lastname?: string;

  @IsEmail()
  email?: string;

  @Length(6, 255)
  password?: string;
}
