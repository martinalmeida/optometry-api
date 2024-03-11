import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create.dto';
import { UpdateHistoryDto } from './dto/update.dto';
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

  async createHistory(data: CreateHistoryDto): Promise<object> {
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

  async updateHistory(id: number, data: UpdateHistoryDto): Promise<object> {
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
