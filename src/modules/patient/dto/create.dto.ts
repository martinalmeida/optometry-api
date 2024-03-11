import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
} from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 191)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 191)
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 191)
  tp_doc: string;

  @IsNotEmpty()
  @Length(1, 20)
  num_doc: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 191)
  gender: string;

  @IsNotEmpty()
  @Length(1, 11)
  age: number;

  @IsNotEmpty()
  @Length(1, 20)
  phone: number;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  address: string;

  @IsOptional()
  @IsEmail()
  @Length(0, 191)
  email: string;

  @IsNotEmpty()
  @Length(1, 11)
  id_user: number;
}
