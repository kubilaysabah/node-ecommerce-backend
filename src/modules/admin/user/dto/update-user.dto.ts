import { IsNotEmpty, Length, IsPhoneNumber, IsEmail, IsInt, IsString, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
	@ApiProperty()
	@Length(3, 20)
	@IsNotEmpty()
	firstname: string

	@ApiProperty()
	@Length(3, 20)
	@IsNotEmpty()
	lastname: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	image?: string

	@ApiProperty()
	@IsNotEmpty()
	@IsPhoneNumber('TR')
	phone: string

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
	@IsInt()
	role: number
}
