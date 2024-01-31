import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '@guards/jwt-auth.guard'

import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'

@ApiTags('admin/role')
@Controller('admin/role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@ApiBearerAuth('authorization')
	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() createRoleDto: CreateRoleDto) {
		return this.roleService.create(createRoleDto)
	}

	@ApiBearerAuth('authorization')
	@UseGuards(JwtAuthGuard)
	@Get()
	findAll() {
		return this.roleService.findAll()
	}

	@ApiBearerAuth('authorization')
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.roleService.findOne(+id)
	}

	@ApiBearerAuth('authorization')
	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
		return this.roleService.update(+id, updateRoleDto)
	}

	@ApiBearerAuth('authorization')
	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.roleService.remove(+id)
	}
}
