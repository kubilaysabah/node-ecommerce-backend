import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginAuthDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	password: string
}
