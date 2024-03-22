import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  IsInt,
  Min,
} from 'class-validator';

export class PatientDto {
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
  @IsString()
  @Length(1, 191)
  num_doc: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 191)
  gender: string;

  @IsNotEmpty()
  @IsString()
  date_of_birth: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  age: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 191)
  phone: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  address: string;

  @IsOptional()
  @IsEmail()
  @Length(0, 191)
  email: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id_user: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id_comp: number;
}
