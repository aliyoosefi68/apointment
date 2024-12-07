import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClinicDetailEntity } from "./entity/detail.entity";
import { Repository } from "typeorm";
import { ClinicDoctorEntity } from "./entity/doctor.entity";
import { ClinicDocumentEntity } from "./entity/document.entity";
import { ClinicEntity } from "./entity/clinick.entity";
import { CreateCategoryDto } from "../category/dto/category.dto";
import { CreateClinicDto } from "./dto/clinic.dto";

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(ClinicDetailEntity)
    private detailRepository: Repository<ClinicDetailEntity>,
    @InjectRepository(ClinicDoctorEntity)
    private doctorRepository: Repository<ClinicDoctorEntity>,
    @InjectRepository(ClinicDocumentEntity)
    private documentRepository: Repository<ClinicDocumentEntity>,
    @InjectRepository(ClinicEntity)
    private clinicRepository: Repository<ClinicEntity>
  ) {}

  async register(dto: CreateClinicDto) {}
}
