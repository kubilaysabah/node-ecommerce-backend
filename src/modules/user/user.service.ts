import { Injectable } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
	find(id: string): void {}

	update(id: string, updateUserDto: UpdateUserDto): void {}

	remove(id: string): void {}
}
