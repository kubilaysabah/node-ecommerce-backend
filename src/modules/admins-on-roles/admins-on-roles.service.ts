import { Injectable } from '@nestjs/common'
import { CreateAdminsOnRolesDto } from './dto/create-admins-on-roles.dto'
import { UpdateAdminsOnRolesDto } from './dto/update-admins-on-roles.dto'
import { FindAdminsOnRolesDto } from './dto/find-admins-on-roles.dto'

import { PrismaService } from '@services/prisma.service'

@Injectable()
export class AdminsOnRolesService {
	constructor(
		private prisma: PrismaService,
	) {}

	create({ role_id, admin_id }: CreateAdminsOnRolesDto) {
		return this.prisma.adminsOnRoles.create({
			data: {
				admin: {
					connect: {
						id: admin_id,
					},
				},
				role: {
					connect: {
						id: role_id,
					},
				},
			},
		})
	}

	findAll() {
		return this.prisma.adminsOnRoles.findMany()
	}

	find({ id, admin_id, role_id }: FindAdminsOnRolesDto) {
		return this.prisma.adminsOnRoles.findMany({
			where: {
				id,
				admin: {
					some: {
						id: admin_id,
					},
				},
				role_id,
			},
		})
	}

	async update(id: string, { role_id, admin_id }: UpdateAdminsOnRolesDto) {
		const admin = await this.find({
			admin_id,
			role_id,
		})

		if (admin.length === 0) {
			throw new Error('Admin not found')
		}

		return this.prisma.adminsOnRoles.update({
			where: {
				id,
			},
			data: {
				admin: {
					connect: {
						id: admin_id,
					},
				},
				role_id,
			},
		})
	}

	async remove(admin_id: string) {
		const adminsOnRoles = await this.find({
			admin_id,
		})

		if (adminsOnRoles.length === 0) {
			throw new Error('Admin not found')
		}

		return this.prisma.adminsOnRoles.deleteMany({
			where: {
				admin: {
					some: {
						id: admin_id,
					},
				},
			},
		})
	}
}
