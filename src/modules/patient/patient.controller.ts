import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto/patient.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    try {
      const users = await this.patientService.getAllPatients();
      if (!users) throw new NotFoundException('No se encontraron pacientes');
      return users;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido un error al obtener los pacientes',
      );
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: number) {
    try {
      const userFound = await this.patientService.getPatientById(+id);
      if (!userFound) throw new NotFoundException('No se encontro el paciente');
      return userFound;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido un error al obtener los pacientes',
      );
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() data: PatientDto) {
    try {
      const user = await this.patientService.createPatient(data);
      return user;
    } catch (error) {
      throw new NotFoundException('No se pudo crear el paciente');
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id') id: number, @Body() data: PatientDto) {
    try {
      const updatedUser = await this.patientService.updatePatient(+id, data);
      return updatedUser;
    } catch (error) {
      throw new NotFoundException('No se pudo actualizar el paciente');
    }
  }

  @Patch('inactivate/:id')
  @UseGuards(JwtAuthGuard)
  async inactivatePatient(@Param('id') id: number) {
    try {
      return await this.patientService.inactivatePatient(+id);
    } catch (error) {
      throw new NotFoundException('No se pudo inactivar el paciente');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: number) {
    try {
      return await this.patientService.deletePatient(Number(id));
    } catch (error) {
      throw new NotFoundException('No se pudo eliminar el paciente');
    }
  }
}
