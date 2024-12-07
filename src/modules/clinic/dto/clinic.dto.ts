import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { LocationType } from "../enum/type.enum";
import { IsEnum, IsMobilePhone, IsPhoneNumber } from "class-validator";

export class CreateClinicDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  categoryId: number;
  @ApiProperty()
  manager_name: string;
  @ApiProperty()
  @IsMobilePhone("fa-IR", {}, { message: "فرمت شماره موبایل درست نیست" })
  manager_mobile: string;
  @ApiProperty()
  province: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  @IsPhoneNumber("IR", { message: "تلفن مورد نظر درست نیست" })
  tel_1: string;
  @ApiProperty()
  tel_2: string;
  @ApiProperty({ format: "binary" })
  license: string;
  @ApiProperty({ enum: LocationType })
  @IsEnum(LocationType, { message: "نوع ملک را به درستی انتخاب کنید" })
  location_type: string;
  @ApiPropertyOptional({ format: "binary" })
  rent_agreement: string;
  @ApiProperty({ format: "binary" })
  front_image: string;
  @ApiPropertyOptional({ format: "binary" })
  side_image: string;
  @ApiProperty({ format: "binary" })
  clinic_image_1: string;
  @ApiPropertyOptional({ format: "binary" })
  clinic_image_2: string;
}
