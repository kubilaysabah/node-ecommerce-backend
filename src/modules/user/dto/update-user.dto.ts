import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	email: string

	@IsNotEmpty()
	@IsString()
	password: string
}
