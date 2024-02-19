import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { RoleService } from './role.service'

import { Roles } from '@decorators/role.decorator'
import { AuthGuard } from '@guards/auth.guard'
import { Role } from '@enums/role.enum'

@ApiTags('role')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Roles(Role.Admin)
	@UseGuards(AuthGuard)
	@Post()
	create(@Body('name') name: string) {
		return this.roleService.create(name)
	}

	@Roles(Role.Admin)
	@UseGuards(AuthGuard)
	@Get()
	findAll() {
		return this.roleService.findAll()
	}

	@Roles(Role.Admin)
	@UseGuards(AuthGuard)
	@Get(':id')
	find(@Param('id') id: string) {
		return this.roleService.find({ id })
	}

	@Roles(Role.Admin)
	@UseGuards(AuthGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body('name') name: string) {
		return this.roleService.update(id, name)
	}

	@Roles(Role.Admin)
	@UseGuards(AuthGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.roleService.remove(id)
	}
}
