import { Body, Controller, Post } from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ClinicService } from "./clinick.service";
import { CreateCategoryDto } from "../category/dto/category.dto";
import { FormType } from "src/common/enum/formType.enum";
import { CreateClinicDto } from "./dto/clinic.dto";

@Controller("clinic")
@ApiTags("Clinic")
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post("register")
  @ApiConsumes(FormType.Multipart)
  register(@Body() dto: CreateClinicDto) {
    return this.clinicService.register(dto);
  }
}
