import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateAdminsOnRolesDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly role_id: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly admin_id: string
}
