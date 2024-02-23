import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { AdminsOnRolesService } from './admins-on-roles.service'
import { CreateAdminsOnRoleDto } from './dto/create-admins-on-roles.dto'
import { UpdateAdminsOnRolesDto } from './dto/update-admins-on-roles.dto'

@Controller('admins-on-roles')
export class AdminsOnRolesController {
	constructor(private readonly adminsOnRolesService: AdminsOnRolesService) {}

	@Post()
	create(@Body() createAdminsOnRoleDto: CreateAdminsOnRoleDto) {
		return this.adminsOnRolesService.create(createAdminsOnRoleDto)
	}

	@Get()
	findAll() {
		return this.adminsOnRolesService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.adminsOnRolesService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAdminsOnRoleDto: UpdateAdminsOnRolesDto) {
		return this.adminsOnRolesService.update(+id, updateAdminsOnRoleDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.adminsOnRolesService.remove(+id)
	}
}
