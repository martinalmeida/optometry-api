import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  nit: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

}
