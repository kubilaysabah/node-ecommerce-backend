import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class FindCustomerDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	readonly id?: string

	@ApiProperty()
	@IsEmail()
	@IsOptional()
	readonly email?: string

	@ApiProperty()
	@IsPhoneNumber('TR')
	@IsOptional()
	readonly phone?: string
}
