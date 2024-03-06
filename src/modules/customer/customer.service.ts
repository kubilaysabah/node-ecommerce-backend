import { HttpException, Injectable } from '@nestjs/common'
import { FindCustomerQuery } from './dto/find-customer.query'
import { Customer } from './entities/customer.entity'

import { PrismaService } from '@services/prisma.service'
import { CreateCustomerDto } from '@modules/customer/dto/create-customer.dto'

@Injectable()
export class CustomerService {
	constructor(private prisma: PrismaService) {}

	findAll() {
		return this.prisma.customer.findMany()
	}

	async find({ email, phone, id }: FindCustomerQuery): Promise<Customer> {
		const user = await this.prisma.customer.findFirst({
			where: {
				id,
				phone,
				email,
			},
		})

		if (!user) {
			throw new HttpException('User not found', 404)
		}

		return {
			email: user.email,
			phone: user.phone,
			id: user.id,
			firstname: user.firstname,
			lastname: user.lastname,
			password: user.password,
		}
	}

	create(createCustomerDto: CreateCustomerDto) {
		return this.prisma.customer.create({
			data: {
				...createCustomerDto,
				created_at: new Date(),
				updated_at: new Date(),
			},
		})
	}
}
