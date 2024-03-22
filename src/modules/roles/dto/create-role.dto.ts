import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    name: string;
}



