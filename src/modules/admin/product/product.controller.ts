import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '@guards/jwt-auth.guard'

import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@ApiTags('admin/product')
@Controller('admin/product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ApiBearerAuth('authorization')
	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto)
	}

	@ApiBearerAuth('authorization')
	@UseGuards(JwtAuthGuard)
	@Get()
	findAll() {
		return this.productService.findAll()
	}

	@ApiBearerAuth('authorization')
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productService.findOne(+id)
	}

	@ApiBearerAuth('authorization')
	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productService.update(+id, updateProductDto)
	}

	@ApiBearerAuth('authorization')
	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.productService.remove(+id)
	}
}
