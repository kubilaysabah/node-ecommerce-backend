import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '@guards/jwt-auth.guard'

import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'

@ApiTags('admin/user')
@Controller('admin/user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiBearerAuth('authorization')
	@UseGuards(JwtAuthGuard)
	@Get()
	findOne(@Query('email') email: string, @Query('id') id: string) {
		if (!email && !id) {
			return this.userService.findAll()
		}

		if (email) {
			return this.userService.findUserByEmail(email)
		}

		return this.userService.findUserById(+id)
	}

	@ApiBearerAuth('authorization')
	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto)
	}

	@ApiBearerAuth('authorization')
	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id)
	}
}
