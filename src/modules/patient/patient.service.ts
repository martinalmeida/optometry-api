import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PatientDto } from './dto/patient.dto';
import { dateTime } from '@helpers/dateTime';
import { Moment } from "moment";

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) { }

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

  async createPatient(data: PatientDto): Promise<object> {
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

  async updatePatient(id: number, data: PatientDto): Promise<object> {
    await this.prisma.patients.update({
      data: {
        ...data,
        updated: dateTime(),
      },
      where: { id: Number(id) },
    });
    return { message: 'Paciente actualizado correctamente' };
  }

  async inactivatePatient(id: number): Promise<object> {
    try {
      const patient = await this.prisma.patients.findUnique({ where: { id }, });
      if (!patient) { throw new Error(`Paciente con ID ${id} no encontrado.`); }
      const newStatus = !patient.status;
      patient.status = newStatus;
      patient.updated = new Date();
      const updatedPatient = await this.prisma.patients.update({ where: { id }, data: patient, });
      // updatedPatient.num_doc.toString();
      // updatedPatient.phone.toString();
      return { patient: updatedPatient };
    } catch (error) {
      return { error: error.message };
    }
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
