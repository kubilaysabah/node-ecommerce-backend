import { HttpException, Injectable } from '@nestjs/common'

import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'

import { Admin } from './entities/admin.entity'

import { RoleService } from '@modules/role/role.service'
import { AdminsOnRolesService } from '@modules/admins-on-roles/admins-on-roles.service'

import { PrismaService } from '@services/prisma.service'
import { BcryptService } from '@services/bcrypt.service'

@Injectable()
export class AdminService {
	constructor(
		private prisma: PrismaService,
		private bcrypt: BcryptService,
		private roleService: RoleService,
		private adminsOnRolesService: AdminsOnRolesService,
	) {}

	async create({ image, email, phone, lastname, firstname, passwordAgain, password }: CreateAdminDto): Promise<Admin> {
		const findAdmin = email ? await this.findByEmail(email) : phone ? await this.findByPhone(phone) : null
		const findRole = await this.roleService.findByName('admin')

		if (findAdmin) {
			throw new HttpException('Admin already exists', 400)
		}

		if (!findRole) {
			throw new HttpException('Role not found', 404)
		}

		if (password !== passwordAgain) {
			throw new HttpException('Passwords do not match', 400)
		}

		const createAdmin = await this.prisma.admin.create({
			data: {
				image,
				email,
				phone,
				firstname,
				lastname,
				created_at: new Date(),
				updated_at: new Date(),
				password: await this.bcrypt.hash(password),
			},
		})

		if (!createAdmin) {
			throw new HttpException('Admin not created', 400)
		}

		const relation = await this.adminsOnRolesService.create({
			role_id: findRole.id,
			admin_id: createAdmin.id,
		})

		if (!relation) {
			throw new HttpException('Admin relations error', 400)
		}

		return createAdmin
	}

	findAll(): Promise<Admin[]> {
		return this.prisma.admin.findMany()
	}

	findById(id: string) {
		return this.prisma.admin.findUnique({
			where: {
				id,
			},
		})
	}

	findByEmail(email: string) {
		return this.prisma.admin.findFirst({
			where: {
				email,
			},
		})
	}

	findByPhone(phone: string) {
		return this.prisma.admin.findFirst({
			where: {
				phone,
			},
		})
	}

	async update(id: string, updateAdminDto: UpdateAdminDto) {
		const findAdmin = await this.findById(id)

		if (!findAdmin) {
			throw new HttpException('Admin not found', 404)
		}

		return this.prisma.admin.update({
			where: {
				id,
			},
			data: updateAdminDto,
		})
	}

	async remove(id: string) {
		const findAdmin = this.findById(id)

		if (!findAdmin) {
			throw new HttpException('Admin not found', 404)
		}

		const deleteRelation = await this.adminsOnRolesService.remove(id)

		if (!deleteRelation) {
			throw new HttpException('Admin relations error', 400)
		}

		return this.prisma.admin.delete({
			where: {
				id,
			},
		})
	}
}
