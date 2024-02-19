import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { RoleService } from './role.service'

@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Post()
	create(@Body('name') name: string) {
		return this.roleService.create(name)
	}

	@Get()
	findAll() {
		return this.roleService.findAll()
	}

	@Get(':id')
	find(@Param('id') id: string) {
		return this.roleService.find({ id })
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body('name') name: string) {
		return this.roleService.update(id, name)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.roleService.remove(id)
	}
}
