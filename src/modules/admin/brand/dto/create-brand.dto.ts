import { IsString, IsNotEmpty, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateBrandDto {
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
	image: string
}
