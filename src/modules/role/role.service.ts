import { HttpException, Injectable } from '@nestjs/common'
import { PrismaService } from '@services/prisma.service'

@Injectable()
export class RoleService {
	constructor(private prisma: PrismaService) {}
	create(name: string) {
		const role = this.findByName(name)

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

	findById(id: string) {
		return this.prisma.role.findUnique({
			where: {
				id,
			},
		})
	}

	findByName(name: string) {
		return this.prisma.role.findFirst({
			where: {
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
