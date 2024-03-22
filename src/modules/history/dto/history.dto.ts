import {
  IsOptional,
  IsNotEmpty,
  Length,
  IsString,
  IsDate,
  IsNumber,
} from 'class-validator';

export class HistoryDto {
  @IsOptional()
  @IsString()
  @Length(0, 191)
  ocular_conditions: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  family_history: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  visual_acuity_left: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  visual_acuity_right: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  refraction_left: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  refraction_right: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  intraocular_pressure: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  slit_lamp_exam: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  fundoscopy: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  diagnosis: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  treatment_plan: string;

  @IsOptional()
  @IsString()
  follow_up_date: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  visual_field_test: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  color_vision_test: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  corneal_topography: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  anterior_segment: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  posterior_segment: string;

  @IsOptional()
  @IsString()
  @Length(0, 191)
  other_notes: string;

  @IsNotEmpty()
  @IsNumber()
  id_user: number;

  @IsNotEmpty()
  @IsNumber()
  id_pat: number;

  @IsNotEmpty()
  @IsNumber()
  id_comp: number;
}
