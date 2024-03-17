import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { HistoryDto } from './dto/history.dto';
import { dateTime } from '@helpers/dateTime';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async getAllHistorys(): Promise<object> {
    return this.prisma.optometricHistory.findMany({
      where: {
        deleted: null,
      },
    });
  }

  async getHistoryById(id: number): Promise<object> {
    return this.prisma.optometricHistory.findUnique({
      where: {
        id: Number(id),
        deleted: null,
      },
    });
  }

  async createHistory(data: HistoryDto): Promise<object> {
    await this.prisma.optometricHistory.create({
      data: {
        ...data,
        created: dateTime(),
      },
    });
    return {
      message: 'Historia creada correctamente',
    };
  }

  async updateHistory(id: number, data: HistoryDto): Promise<object> {
    await this.prisma.optometricHistory.update({
      data: {
        ...data,
        updated: dateTime(),
      },
      where: { id: Number(id) },
    });
    return { message: 'Historia actualizada correctamente' };
  }

  async deleteHistory(id: number): Promise<object> {
    await this.prisma.optometricHistory.update({
      data: {
        deleted: dateTime(),
      },
      where: {
        id: Number(id),
      },
    });
    return {
      message: 'Historia eliminada correctamente',
    };
  }
}