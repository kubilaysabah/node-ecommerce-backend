import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { Roles } from '@decorators/role.decorator'
import { Role } from '@enums/role.enum'
import { AuthGuard } from '@guards/auth.guard'

import { CustomerService } from './customer.service'
import { CreateCustomerDto } from '@modules/customer/dto/create-customer.dto'

@ApiTags('customer')
@ApiBearerAuth('authorization')
@Controller('customer')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Get(':id')
	findById(@Param('id') id: string) {
		return this.customerService.findById(id)
	}

	@Roles(Role.Admin)
	@UseGuards(AuthGuard)
	@Post()
	create(@Body() createCustomerDto: CreateCustomerDto) {
		return this.customerService.create(createCustomerDto)
	}
}
