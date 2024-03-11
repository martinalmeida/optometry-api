import {
  IsOptional,
  IsNotEmpty,
  Length,
  IsString,
  IsDate,
} from 'class-validator';

export class CreateHistoryDto {
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
  @IsDate()
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
  @Length(1, 11)
  id_user: number;

  @IsNotEmpty()
  @Length(1, 11)
  id_pat: number;
}
