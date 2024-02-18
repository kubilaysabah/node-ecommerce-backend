import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class Customer {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly id: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly firstname: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly lastname: string

	@ApiProperty()
	@IsNotEmpty()
	@IsPhoneNumber('TR')
	readonly phone: string

	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	readonly email: string
}
