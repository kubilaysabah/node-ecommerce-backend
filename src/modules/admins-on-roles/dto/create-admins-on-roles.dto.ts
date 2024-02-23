import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateAdminsOnRolesDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly role_id: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly admin_id: string
}
