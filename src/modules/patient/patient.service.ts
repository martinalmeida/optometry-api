import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create.dto';
import { UpdatePatientDto } from './dto/update.dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async getAllPatients(): Promise<object> {
    return this.prisma.patients.findMany({});
  }

  async getPatientById(id: number): Promise<object> {
    return this.prisma.patients.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async createPatient(data: CreatePatientDto): Promise<object> {
    await this.prisma.patients.create({
      data,
    });
    return {
      message: 'Paciente creado correctamente',
    };
  }

  async updatePatient(id: number, data: UpdatePatientDto): Promise<object> {
    await this.prisma.patients.update({
      data,
      where: { id: Number(id) },
    });
    return { message: 'Paciente actualizado correctamente' };
  }

  async deletePatient(id: number): Promise<object> {
    await this.prisma.patients.delete({
      where: {
        id: Number(id),
      },
    });
    return {
      message: 'Paciente eliminado correctamente',
    };
  }
}
