import { HttpException, Injectable } from '@nestjs/common'

import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { FindAdminDto } from './dto/find-admin.dto'

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
		const findAdmin = await this.find({ email, phone })
		const findRole = await this.roleService.find({ name: 'admin' })

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
			select: {
				id: true,
				role_id: true,
				email: true,
				phone: true,
				firstname: true,
				lastname: true,
				image: true,
				created_at: true,
				updated_at: true,
				password: true,
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
		return this.prisma.admin.findMany({
			select: {
				id: true,
				role_id: true,
				email: true,
				phone: true,
				firstname: true,
				lastname: true,
				image: true,
				created_at: true,
				updated_at: true,
				password: true,
			},
		})
	}

	async find({ id, email, phone }: FindAdminDto): Promise<Admin> {
		const findAdmin = await this.prisma.admin.findFirst({
			where: {
				id,
				phone,
				email,
			},
		})

		if (!findAdmin) {
			throw new HttpException('Admin not found', 404)
		}

		return {
			phone: findAdmin.phone,
			email: findAdmin.email,
			firstname: findAdmin.firstname,
			lastname: findAdmin.lastname,
			id: findAdmin.id,
			role_id: findAdmin.role_id,
			image: findAdmin.image,
			password: findAdmin.password,
		}
	}

	async update(id: string, updateAdminDto: UpdateAdminDto) {
		const findAdmin = await this.find({
			id,
		})

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
		const findAdmin = this.find({ id })

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
