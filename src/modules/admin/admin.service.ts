import { HttpException, Injectable } from '@nestjs/common'

import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { FindAdminDto } from './dto/find-admin.dto'

import { RoleService } from '@modules/role/role.service'

import { PrismaService } from '@services/prisma.service'
import { BcryptService } from '@services/bcrypt.service'

@Injectable()
export class AdminService {
	constructor(
		private prisma: PrismaService,
		private bcrypt: BcryptService,
		private roleService: RoleService,
	) {}
	async create({ image, email, phone, lastname, firstname, passwordAgain, password }: CreateAdminDto) {
		const admin = await this.find({ email, phone })
		const role = await this.roleService.find({ name: 'admin' })

		if (admin) {
			throw new HttpException('Admin already exists', 400)
		}

		if (password !== passwordAgain) {
			throw new HttpException('Passwords do not match', 400)
		}

		if (!role) {
			throw new HttpException('Role not found', 404)
		}

		return this.prisma.admin.create({
			data: {
				image,
				email,
				phone,
				firstname,
				lastname,
				created_at: new Date(),
				updated_at: new Date(),
				password: await this.bcrypt.hash(password),
				role: {
					connect: {
						id: role.id,
					},
				},
			},
			select: {
				id: true,
				role: true,
				email: true,
				phone: true,
				firstname: true,
				lastname: true,
				image: true,
				created_at: true,
				updated_at: true,
			},
		})
	}

	findAll() {
		return this.prisma.admin.findMany()
	}

	async find({ id, email, phone }: FindAdminDto) {
		const admin = await this.prisma.admin.findFirst({
			where: {
				id,
				phone,
				email,
			},
		})

		if (!admin) {
			throw new HttpException('Admin not found', 404)
		}

		return {
			phone: admin.phone,
			email: admin.email,
			firstname: admin.firstname,
			lastname: admin.lastname,
			id: admin.id,
			role: admin.role_id,
			image: admin.image,
		}
	}

	update(id: string, updateAdminDto: UpdateAdminDto) {
		return this.prisma.admin.update({
			where: {
				id,
			},
			data: updateAdminDto,
		})
	}

	remove(id: string) {
		return this.prisma.admin.delete({
			where: {
				id,
			},
		})
	}
}
