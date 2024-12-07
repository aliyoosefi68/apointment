import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CatagoryService } from "./category.service";
import { FormType } from "src/common/enum/formType.enum";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";
import { Pagination } from "src/common/decorator/pagination.decorator";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Controller("category")
@ApiTags("Category")
export class CategoryController {
  constructor(private readonly categoryService: CatagoryService) {}

  @Post()
  // @ApiOperation({ summary: "hello every one" })
  @ApiConsumes(FormType.Urlencoded, FormType.Json)
  create(@Body() createDto: CreateCategoryDto) {
    return this.categoryService.create(createDto);
  }

  @Get()
  @Pagination()
  findAll(@Query() pagination: PaginationDto) {
    return this.categoryService.findAll(pagination);
  }

  @Get("/by-slug/:slug")
  findBySlug(@Param("slug") slug: string) {
    return this.categoryService.findBySlug(slug);
  }

  @Patch(":id")
  @ApiConsumes(FormType.Multipart)
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(+id, updateDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
