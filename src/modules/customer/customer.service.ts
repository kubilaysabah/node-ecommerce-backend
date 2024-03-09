import { Injectable } from '@nestjs/common'
import { Customer } from './entities/customer.entity'

import { PrismaService } from '@services/prisma.service'
import { CreateCustomerDto } from '@modules/customer/dto/create-customer.dto'

@Injectable()
export class CustomerService {
	constructor(private prisma: PrismaService) {}

	findAll() {
		return this.prisma.customer.findMany()
	}

	findById(id: string): Promise<Customer> {
		return this.prisma.customer.findUnique({
			where: {
				id,
			},
		})
	}

	findByEmail(email: string): Promise<Customer> {
		return this.prisma.customer.findFirst({
			where: {
				email,
			},
		})
	}

	findByPhone(phone: string): Promise<Customer> {
		return this.prisma.customer.findFirst({
			where: {
				phone,
			},
		})
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
