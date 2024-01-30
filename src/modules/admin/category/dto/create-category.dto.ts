import { IsInt, IsNotEmpty, IsString, IsArray, ValidateNested, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class CreateImageDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	image: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string
}

export class CreateCategoryDto {
	@ApiProperty()
	@IsOptional()
	@IsInt()
	parent_id?: number

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
	@IsString()
	url: string

	@ApiProperty()
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateImageDto)
	images: CreateImageDto[]
}
