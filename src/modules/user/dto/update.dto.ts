import { IsNotEmpty, IsEmail, Length, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  lastname?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @Length(6, 255)
  password?: string;

  @IsBoolean()
  status: boolean;
}
