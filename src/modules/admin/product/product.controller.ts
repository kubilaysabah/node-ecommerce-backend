import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthenticatedGuard } from '@auth/guards/authenticated.guard'

import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@ApiTags('admin/product')
@Controller('admin/product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UseGuards(AuthenticatedGuard)
	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto)
	}

	@UseGuards(AuthenticatedGuard)
	@Get()
	findAll() {
		return this.productService.findAll()
	}

	@UseGuards(AuthenticatedGuard)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productService.findOne(+id)
	}

	@UseGuards(AuthenticatedGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productService.update(+id, updateProductDto)
	}

	@UseGuards(AuthenticatedGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.productService.remove(+id)
	}
}
