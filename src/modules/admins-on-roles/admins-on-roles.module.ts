import { Module } from '@nestjs/common'
import { AdminsOnRolesService } from './admins-on-roles.service'
import { AdminsOnRolesController } from './admins-on-roles.controller'

import { AdminService } from '@modules/admin/admin.service'
import { RoleService } from '@modules/role/role.service'
import { AuthService } from '@modules/auth/auth.service'
import { CustomerService } from '@modules/customer/customer.service'

@Module({
	controllers: [AdminsOnRolesController],
	providers: [AdminsOnRolesService, AdminService, CustomerService, RoleService, AuthService],
})
export class AdminsOnRolesModule {}
