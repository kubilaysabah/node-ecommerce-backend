import { HttpException, Injectable } from '@nestjs/common'
import { PrismaService } from '@shared/prisma.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductService {
	constructor(private prismaService: PrismaService) {}

	create({
		url,
		code,
		content,
		description,
		name,
		price,
		rating,
		quantity,
		ProductImageRelations,
		ProductCategoryRelations,
		ProductBrandRelations,
	}: CreateProductDto) {
		try {
			return this.prismaService.products.create({
				data: {
					url,
					code,
					content,
					description,
					name,
					price,
					rating,
					quantity,
					ProductBrandRelations: {
						create: ProductBrandRelations,
					},
					ProductCategoryRelations: {
						create: ProductCategoryRelations,
					},
					ProductImageRelations: {
						create: ProductImageRelations,
					},
				},
			})
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	findAll() {
		try {
			this.prismaService.products.findMany()
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	findOne(id: number) {
		try {
			return this.prismaService.products.findUnique({
				where: {
					id: id,
				},
				include: {
					ProductCategoryRelations: true,
					ProductImageRelations: true,
				},
			})
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	update(
		id: number,
		{
			url,
			code,
			content,
			description,
			name,
			price,
			rating,
			quantity,
			ProductBrandRelations,
			ProductImageRelations,
			ProductCategoryRelations,
		}: UpdateProductDto,
	) {
		try {
			return this.prismaService.products.update({
				where: {
					id: id,
				},
				data: {
					url,
					code,
					content,
					description,
					name,
					price,
					rating,
					quantity,
					ProductBrandRelations: {
						create: ProductBrandRelations,
					},
					ProductCategoryRelations: {
						create: ProductCategoryRelations,
					},
					ProductImageRelations: {
						create: ProductImageRelations,
					},
				},
			})
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	remove(id: number) {
		try {
			return this.prismaService.products.delete({
				where: {
					id: id,
				},
			})
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}
}
