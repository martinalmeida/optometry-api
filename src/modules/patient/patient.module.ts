import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [PatientController],
  providers: [PatientService],
  imports: [PrismaModule],
})
export class PatientModule {}
