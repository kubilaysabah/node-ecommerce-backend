import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterAuthDto {
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
	@IsEmail()
	readonly email: string

	@ApiProperty()
	@IsNotEmpty()
	@IsPhoneNumber('TR')
	readonly phone: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly password: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly passwordAgain: string
}
