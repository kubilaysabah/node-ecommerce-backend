import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateAdminDto {
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	readonly image?: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly firstname: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly lastname: string

	@ApiProperty()
	@IsEmail()
	@IsNotEmpty()
	readonly email: string

	@ApiProperty()
	@IsPhoneNumber('TR')
	@IsNotEmpty()
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
