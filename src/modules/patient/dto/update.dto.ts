import { IsEmail, Length } from 'class-validator';

export class UpdatePatientDto {
  @Length(1, 191)
  name?: string;

  @Length(0, 191)
  lastname?: string;

  @Length(1, 191)
  tp_doc?: string;

  @Length(1, 20)
  num_doc?: number;

  @Length(1, 191)
  gender?: string;

  @Length(1, 11)
  age?: number;

  @Length(1, 20)
  phone?: number;

  @Length(0, 191)
  address?: string;

  @IsEmail()
  @Length(0, 191)
  email?: string;

  @Length(1, 11)
  id_user?: number;
}
