import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class Admin {
	@ApiProperty()
	@IsNotEmpty()
	readonly phone: string

	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	readonly email: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly firstname: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly lastname: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly id: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly role: {
		id: string
		role_id: string
	}

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	readonly image?: string

	@ApiProperty({ required: false })
	@IsDateString()
	@IsOptional()
	readonly created_at?: Date

	@ApiProperty({ required: false })
	@IsDateString()
	@IsOptional()
	readonly updated_at?: Date
}
