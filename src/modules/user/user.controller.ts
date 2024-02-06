import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':id')
	find(@Param('id') id: string): void {
		this.userService.find(id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): void {
		this.userService.update(id, updateUserDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(id)
	}
}
