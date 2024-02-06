import { IsEmail, IsNotEmpty, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginAuthDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@ApiProperty()
	@Length(3, 20)
	@IsNotEmpty()
	password: string
}
