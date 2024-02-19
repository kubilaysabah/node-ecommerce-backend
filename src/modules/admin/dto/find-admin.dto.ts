import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class FindAdminDto {
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	readonly id?: string

	@ApiProperty({ required: false })
	@IsEmail()
	@IsOptional()
	readonly email?: string

	@ApiProperty({ required: false })
	@IsPhoneNumber('TR')
	@IsOptional()
	readonly phone?: string
}
