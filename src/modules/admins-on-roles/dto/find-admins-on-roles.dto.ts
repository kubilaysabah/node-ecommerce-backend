import { IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class FindAdminsOnRolesDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	readonly id?: string

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	readonly admin_id?: string

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	readonly role_id?: string
}
