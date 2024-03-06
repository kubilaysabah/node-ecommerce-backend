import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { Roles } from '@decorators/role.decorator'
import { Role } from '@enums/role.enum'
import { AuthGuard } from '@guards/auth.guard'

import { CustomerService } from './customer.service'
import { FindCustomerQuery } from './dto/find-customer.query'
import { CreateCustomerDto } from '@modules/customer/dto/create-customer.dto'

@ApiTags('customer')
@ApiBearerAuth()
@Controller('customer')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Roles(Role.Admin)
	@UseGuards(AuthGuard)
	@Get()
	find(@Query() { id, email, phone }: FindCustomerQuery) {
		if (id || email || phone) {
			return this.customerService.find({ id, email, phone })
		}

		return this.customerService.findAll()
	}

	@Roles(Role.Admin)
	@UseGuards(AuthGuard)
	@Post()
	create(@Body() createCustomerDto: CreateCustomerDto): void {
		this.customerService.create(createCustomerDto)
	}
}
