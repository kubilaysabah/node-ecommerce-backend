import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '@guards/jwt-auth.guard'

import { BrandService } from './brand.service'
import { CreateBrandDto } from './dto/create-brand.dto'
import { UpdateBrandDto } from './dto/update-brand.dto'

@ApiTags('admin/brand')
@Controller('admin/brand')
export class BrandController {
	constructor(private readonly brandService: BrandService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() createBrandDto: CreateBrandDto) {
		return this.brandService.create(createBrandDto)
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	findAll() {
		return this.brandService.findAll()
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.brandService.findOne(+id)
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
		return this.brandService.update(+id, updateBrandDto)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.brandService.remove(+id)
	}
}
