import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { HistoryDto } from './dto/history.dto';
import { dateTime } from '@helpers/dateTime';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) { }
  async create(data: HistoryDto): Promise<object> {
    try {
      const history = await this.prisma.optometricHistory.create({ data: { ...data, created: dateTime(), }, });
      if (!history) { throw new Error(`Historia con ID ${history.id} no pudo ser creada. ☣️`); }
      return { history: history };
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAll(): Promise<object> {
    try {
      const histories = await this.prisma.optometricHistory.findMany({});
      if (!histories || histories.length === 0) { return { message: `No se encontraron historias. 🏥` } };
      return { histories: histories };
    } catch (error) {
      return { error: error.message };
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const historyById = await this.prisma.optometricHistory.findUnique({ where: { id: id, deleted: null, }, });
      if (!historyById) { return { message: `Historia con ID ${id} no encontrado.` }; }
      return { historyById: historyById };
    } catch (error) {
      return { error: error.message };
    }
  }

  async update(id: number, data: HistoryDto): Promise<object> {
    try {
      const history = await this.prisma.optometricHistory.findUnique({ where: { id }, });
      if (!history) { return { message: `Historia con ID ${id} no encontrado y no fue encontrada. ☣️` }; }
      const updatedHistory = await this.prisma.optometricHistory.update({ where: { id }, data, });
      if (!updatedHistory) { throw new Error(`Historia con ID ${id} no pudo ser actualizada. ☣️`); }
      return { updatedHistory: updatedHistory };
    } catch (error) {
      return { error: error.message };
    }
  }

  async inativate(id: number): Promise<object> {
    try {
      const history = await this.prisma.optometricHistory.findUnique({ where: { id }, });
      if (!history) { return { message: `Historia con ID ${id} no encontrado.` }; }
      const newStatus = !history.status;
      history.status = newStatus;
      history.updated = new Date();
      const updatedHistory = await this.prisma.optometricHistory.update({ where: { id }, data: history, });
      if (!updatedHistory) { throw new Error(`Historia con ID ${id} no pudo ser inactivada. ☣️`); }
      return { message: `Historia con ID ${id} inactivada correctamente. 📄` };
    } catch (error) {
      return { error: error.message };
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const History = await this.prisma.optometricHistory.findUnique({ where: { id }, });
      if (!History) { return { message: `Historia con ID ${id} no encontrado.` }; }
      //const deleteHistory = await this.prisma.optometricHistory.delete({ where: { id }, });
      //if (!deleteHistory) { throw new Error(`Historia con ID ${id} no pudo ser eliminada. ☣️`); }
      return { message: 'Historia eliminada correctamente. ❌' };
    } catch (error) {
      return { error: error.message };
    }
  }
}
