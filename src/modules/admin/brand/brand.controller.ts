import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'

import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { AuthenticatedGuard } from '@guards/authenticated.guard';

@ApiTags('admin/brand')
@Controller('admin/brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
