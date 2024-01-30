import { HttpException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Users } from '@prisma/client'

import { RegisterDTO } from './dto/register.dto'
import { LoginDTO } from './dto/login.dto'

import { UserService } from '@admin/user/user.service'
import { RoleService } from '@admin/role/role.service'

import { PrismaService } from '@shared/prisma.service'
import { compare, hash } from '@utils/bcrypt'
import { ValidateUserEntity } from '@auth/entities/register.entity'

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private userService: UserService,
		private roleService: RoleService,
		private jwtService: JwtService,
	) {}

	async validateUser({ email, password }: LoginDTO): Promise<ValidateUserEntity | null> {
		const user = await this.userService.findUserByEmail(email)

		if (!user) {
			throw new HttpException('User not found', 404)
		}

		const isMatch = await compare(password, user.password)

		if (!isMatch) {
			throw new HttpException('Invalid credentials', 401)
		}

		return {
			email: user.email,
			phone: user.phone,
			firstname: user.firstname,
			lastname: user.lastname,
			image: user.image,
			id: user.id,
		}
	}

	async register({ email, password, role, lastname, phone, firstname }: RegisterDTO): Promise<Users> {
		const findUser = await this.userService.findUserByEmail(email)

		if (findUser) {
			throw new HttpException('User already exists', 409)
		}

		const hashedPassword = await hash(password)

		try {
			return this.prismaService.users.create({
				data: {
					email,
					phone,
					firstname,
					lastname,
					password: hashedPassword,
					role: {
						connect: {
							id: role,
						},
					},
				},
			})
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	async login(loginDTO: LoginDTO) {
		try {
			const user = await this.validateUser(loginDTO)

			return this.jwtService.sign({
				user,
			})
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}
}
