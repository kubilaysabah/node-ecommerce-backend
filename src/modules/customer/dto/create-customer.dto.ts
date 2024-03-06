import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCustomerDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	readonly email: string

	@ApiProperty()
	@IsPhoneNumber('TR')
	@IsNotEmpty()
	readonly phone: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly password: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly firstname: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly lastname: string
}
