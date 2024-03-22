import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PatientDto } from './dto/patient.dto';
import { dateTime } from '@helpers/dateTime';
import * as moment from 'moment-timezone';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) { }
  async create(data: PatientDto): Promise<object> {
    try {
      const newPatient = await this.prisma.patients.create({ data: { ...data, created: moment().tz('America/Bogota').format(), }, });
      if (!newPatient) { throw new Error(`Paciente con ID ${data.name + data.lastname} no pudo ser creado.`); }
      return { newPatient: newPatient };
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAll(): Promise<object> {
    try {
      const Patient = await this.prisma.patients.findMany({ where: { deleted: null, } });
      return { Patient: Patient };
    } catch (error) {
      return { error: error.message };
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const PatientById = await this.prisma.patients.findUnique({ where: { id: id, deleted: null, }, });
      if (!PatientById) { throw new Error(`Paciente con ID ${id} no encontrado.`); }
      return { PatientById: PatientById };
    } catch (error) {
      return { error: error.message };
    }

  }

  async update(id: number, data: PatientDto): Promise<object> {
    try {
      const Patient = await this.prisma.patients.findUnique({ where: { id: id, deleted: null, }, });
      if (!Patient) { throw new Error(`Paciente con ID ${id} no encontrado y no fue encontrada.`); }
      const updatedPatient = await this.prisma.patients.update({ where: { id: id }, data: data, });
      if (!updatedPatient) { throw new Error(`Paciente con ID ${id} no pudo ser actualizado. ☣️`); }
      return { updatedPatient: updatedPatient };
    } catch (error) {
      return { error: error.message };
    }
  }

  async inativate(id: number): Promise<object> {
    try {
      const patient = await this.prisma.patients.findUnique({ where: { id }, });
      if (!patient) { throw new Error(`Paciente con ID ${id} no encontrado.`); }
      const newStatus = !patient.status;
      patient.status = newStatus;
      patient.updated = new Date();
      const updatedPatient = await this.prisma.patients.update({ where: { id }, data: patient, });
      return { patient: updatedPatient };
    } catch (error) {
      return { error: error.message };
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const PatientById = await this.prisma.patients.findUnique({ where: { id }, });
      if (!PatientById) { throw new Error(`Paciente con ID ${id} no encontrado.`); }
      // const deletePatient = await this.prisma.patients.delete({ where: { id } });
      // if (!deletePatient) { throw new Error(`Paciente con ID ${id} no pudo ser eliminado. ☣️`); }
      return { message: 'Paciente eliminado correctamente' };
    } catch (error) {
      return { error: error.message };
    }
  }
}
