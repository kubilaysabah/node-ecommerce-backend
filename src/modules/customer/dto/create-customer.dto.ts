import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCustomerDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	image?: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	firstname: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	lastname: string

	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@ApiProperty()
	@IsNotEmpty()
	@IsPhoneNumber('TR')
	phone: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	password: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	passwordAgain: string

	@ApiProperty()
	@IsDateString()
	@IsOptional()
	birthdate?: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	gender?: string
}
