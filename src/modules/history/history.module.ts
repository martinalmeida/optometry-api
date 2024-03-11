import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  imports: [PrismaModule],
})
export class HistoryModule {}
