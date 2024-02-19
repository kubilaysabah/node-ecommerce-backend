import { IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class FindRoleDto {
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	readonly id?: string

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	readonly name?: string
}
