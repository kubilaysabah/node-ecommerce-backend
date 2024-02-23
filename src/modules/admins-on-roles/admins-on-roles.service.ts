import { Injectable } from '@nestjs/common'
import { CreateAdminsOnRolesDto } from './dto/create-admins-on-roles.dto'
import { UpdateAdminsOnRolesDto } from './dto/update-admins-on-roles.dto'

import { PrismaService } from '@services/prisma.service'
import { AdminService } from '@modules/admin/admin.service'
import { RoleService } from '@modules/role/role.service'

@Injectable()
export class AdminsOnRolesService {
	constructor(
		private prisma: PrismaService,
		private adminService: AdminService,
		private roleService: RoleService,
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

	findOne(id: string) {
		return this.prisma.adminsOnRoles.findFirst({
			where: {
				id,
			},
		})
	}

	update(id: string, { role_id, admin_id }: UpdateAdminsOnRolesDto) {
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
