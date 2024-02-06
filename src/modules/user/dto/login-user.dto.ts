import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	email: string

	@IsNotEmpty()
	@IsString()
	password: string
}
