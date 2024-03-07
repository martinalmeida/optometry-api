import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PatientModule } from './modules/patient/patient.module';

@Module({
  imports: [AuthModule, UserModule, PatientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
