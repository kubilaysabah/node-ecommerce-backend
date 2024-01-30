import { IsString, IsNotEmpty, IsOptional, IsInt, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class ProductCategoryRelationsDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	productId: number

	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	categoryId: number
}

export class ProductImageDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	image: string
}

export class ProductImageRelationsDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	productId: number

	@ApiProperty()
	@IsNotEmpty()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ProductImageDto)
	images: ProductImageDto[]
}

export class ProductBrandRelationsDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	productId: number

	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	brandId: number
}

export class CreateProductDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	code: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	url: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	description?: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	content?: string

	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	price: number

	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	quantity: number

	@ApiProperty()
	@IsOptional()
	@IsInt()
	rating: number

	@ApiProperty()
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ProductCategoryRelationsDto)
	ProductCategoryRelations?: ProductCategoryRelationsDto[]

	@ApiProperty()
	@IsOptional()
	@Type(() => ProductCategoryRelationsDto)
	ProductBrandRelations?: ProductBrandRelationsDto

	@ApiProperty()
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ProductImageRelationsDto)
	ProductImageRelations?: ProductImageRelationsDto[]
}
