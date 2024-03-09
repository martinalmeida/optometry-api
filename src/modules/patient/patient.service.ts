import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create.dto';
import { UpdatePatientDto } from './dto/update.dto';
import { dateTime } from '@helpers/dateTime';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async getAllPatients(): Promise<object> {
    return this.prisma.patients.findMany({
      where: {
        deleted: null,
      },
    });
  }

  async getPatientById(id: number): Promise<object> {
    return this.prisma.patients.findUnique({
      where: {
        id: Number(id),
        deleted: null,
      },
    });
  }

  async createPatient(data: CreatePatientDto): Promise<object> {
    await this.prisma.patients.create({
      data: {
        ...data,
        created: dateTime(),
      },
    });
    return {
      message: 'Paciente creado correctamente',
    };
  }

  async updatePatient(id: number, data: UpdatePatientDto): Promise<object> {
    await this.prisma.patients.update({
      data: {
        ...data,
        updated: dateTime(),
      },
      where: { id: Number(id) },
    });
    return { message: 'Paciente actualizado correctamente' };
  }

  async deletePatient(id: number): Promise<object> {
    await this.prisma.patients.update({
      data: {
        deleted: dateTime(),
      },
      where: {
        id: Number(id),
      },
    });
    return {
      message: 'Paciente eliminado correctamente',
    };
  }
}
