import { IsNotEmpty, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
  @ApiProperty()
  @Length(3, 20)
  @IsNotEmpty()
  name: string
}
