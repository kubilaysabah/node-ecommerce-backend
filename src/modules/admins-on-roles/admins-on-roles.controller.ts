import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { AdminsOnRolesService } from './admins-on-roles.service'
import { CreateAdminsOnRolesDto } from './dto/create-admins-on-roles.dto'
import { UpdateAdminsOnRolesDto } from './dto/update-admins-on-roles.dto'

import { AuthGuard } from '@guards/auth.guard'

import { Roles } from '@decorators/role.decorator'

import { Role } from '@enums/role.enum'

@ApiBearerAuth('authorization')
@ApiTags('admins-on-roles')
@Controller('admins-on-roles')
export class AdminsOnRolesController {
	constructor(private readonly adminsOnRolesService: AdminsOnRolesService) {}

	@UseGuards(AuthGuard)
	@Roles(Role.Admin)
	@Post()
	create(@Body() createAdminsOnRoleDto: CreateAdminsOnRolesDto) {
		return this.adminsOnRolesService.create(createAdminsOnRoleDto)
	}

	@UseGuards(AuthGuard)
	@Roles(Role.Admin)
	@Get()
	findAll() {
		return this.adminsOnRolesService.findAll()
	}

	@UseGuards(AuthGuard)
	@Roles(Role.Admin)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.adminsOnRolesService.find({ id })
	}

	@UseGuards(AuthGuard)
	@Roles(Role.Admin)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAdminsOnRoleDto: UpdateAdminsOnRolesDto) {
		return this.adminsOnRolesService.update(id, updateAdminsOnRoleDto)
	}

	@UseGuards(AuthGuard)
	@Roles(Role.Admin)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.adminsOnRolesService.remove(id)
	}
}
