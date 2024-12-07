import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClinicEntity } from "./entity/clinick.entity";
import { ClinicDetailEntity } from "./entity/detail.entity";
import { ClinicDoctorEntity } from "./entity/doctor.entity";
import { ClinicDocumentEntity } from "./entity/document.entity";
import { ClinicService } from "./clinick.service";
import { ClinicController } from "./clinick.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClinicEntity,
      ClinicDetailEntity,
      ClinicDoctorEntity,
      ClinicDocumentEntity,
    ]),
  ],
  controllers: [ClinicController],
  providers: [ClinicService],
})
export class ClinicModule {}
