import { HttpException, Injectable } from '@nestjs/common'
import { FindRoleDto } from './dto/find-role.dto'

import { PrismaService } from '@services/prisma.service'

@Injectable()
export class RoleService {
	constructor(private prisma: PrismaService) {}
	create(name: string) {
		const role = this.find({ name })

		if (role) {
			throw new HttpException('Role already exists', 409)
		}

		return this.prisma.role.create({
			data: {
				name: name.toLowerCase().trim(),
			},
		})
	}

	findAll() {
		return this.prisma.role.findMany()
	}

	find({ name, id }: FindRoleDto) {
		return this.prisma.role.findFirst({
			where: {
				id,
				name: name.toLowerCase().trim(),
			},
		})
	}

	update(id: string, name: string) {
		return this.prisma.role.update({
			where: {
				id,
			},
			data: {
				name,
			},
		})
	}

	remove(id: string) {
		return this.prisma.role.delete({
			where: {
				id,
			},
		})
	}
}
