import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @Length(1, 191)
  name: string;

  @IsNotEmpty()
  @Length(0, 191)
  lastname: string;

  @IsNotEmpty()
  @Length(1, 191)
  tp_doc: string;

  @IsNotEmpty()
  @Length(1, 20)
  num_doc: number;

  @IsNotEmpty()
  @Length(1, 191)
  gender: string;

  @IsNotEmpty()
  @Length(1, 11)
  age: number;

  @IsNotEmpty()
  @Length(1, 20)
  phone: number;

  @IsNotEmpty()
  @Length(0, 191)
  address: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(0, 191)
  email: string;

  @IsNotEmpty()
  @Length(1, 11)
  id_user: number;
}
