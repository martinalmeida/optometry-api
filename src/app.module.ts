import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PatientModule } from './modules/patient/patient.module';
import { HistoryModule } from './modules/history/history.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [AuthModule, UserModule, PatientModule, HistoryModule, CompaniesModule, RolesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
