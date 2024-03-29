import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { AdminService } from './admin.service'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'

import { Roles } from '@decorators/role.decorator'
import { Role } from '@enums/role.enum'
import { AuthGuard } from '@guards/auth.guard'
import { RolesGuard } from '@guards/roles.guard'

@ApiTags('admin')
@ApiBearerAuth('authorization')
@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@ApiOperation({ summary: 'Create Admin' })
	@ApiResponse({ status: 200, description: 'Create admin' })
	@UseGuards(AuthGuard, RolesGuard)
	@Roles(Role.Admin)
	@Post()
	create(@Body() createAdminDto: CreateAdminDto) {
		return this.adminService.create(createAdminDto)
	}

	@UseGuards(AuthGuard)
	@Roles(Role.Admin)
	@Get()
	findAll() {
		return this.adminService.findAll()
	}

	@UseGuards(AuthGuard)
	@Roles(Role.Admin)
	@Get(':id')
	findById(@Param('id') id: string) {
		return this.adminService.findById(id)
	}

	@UseGuards(AuthGuard)
	@Roles(Role.Admin)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
		return this.adminService.update(id, updateAdminDto)
	}

	@UseGuards(AuthGuard)
	@Roles(Role.Admin)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.adminService.remove(id)
	}
}
