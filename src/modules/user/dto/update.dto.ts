import { IsEmail, Length } from 'class-validator';

export class UpdateUserDto {
  @Length(1, 191)
  name?: string;

  @Length(0, 191)
  lastname?: string;

  @IsEmail()
  @Length(1, 191)
  email?: string;

  @Length(6, 191)
  password?: string;
}
