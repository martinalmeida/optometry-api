import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException, UseGuards, Patch, } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto/patient.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: PatientDto) {
    try {
      const user = await this.patientService.create(data);
      return user;
    } catch (error) {
      throw new NotFoundException('No se pudo crear el paciente');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const users = await this.patientService.findAll();
      return users;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido un error al obtener los pacientes',
      );
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number) {
    try {
      const userFound = await this.patientService.findOne(+id);
      return userFound;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido un error al obtener los pacientes',
      );
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() data: PatientDto) {
    try {
      const updatedUser = await this.patientService.update(+id, data);
      return updatedUser;
    } catch (error) {
      throw new NotFoundException('No se pudo actualizar el paciente');
    }
  }

  @Patch('inactivate/:id')
  @UseGuards(JwtAuthGuard)
  async inativate(@Param('id') id: number) {
    try {
      const updatedUser = await this.patientService.inativate(+id);
      return updatedUser;
    } catch (error) {
      throw new NotFoundException('No se pudo inactivar el paciente');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    try {
      return await this.patientService.remove(Number(id));
    } catch (error) {
      throw new NotFoundException('No se pudo eliminar el paciente');
    }
  }
}
