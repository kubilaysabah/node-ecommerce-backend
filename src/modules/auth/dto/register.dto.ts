import { IsInt, IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@ApiProperty()
	@Length(3, 20)
	@IsNotEmpty()
	password: string

	@ApiProperty()
	@IsNotEmpty()
	@IsPhoneNumber()
	phone: string

	@ApiProperty()
	@IsNotEmpty()
	@Length(3, 20)
	firstname: string

	@ApiProperty()
	@IsNotEmpty()
	@Length(3, 20)
	lastname: string

	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	role: number
}
