import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { AdminController } from './admin.controller'

import { RoleService } from '@modules/role/role.service'
import { AdminsOnRolesService } from '@modules/admins-on-roles/admins-on-roles.service'

@Module({
	controllers: [AdminController],
	providers: [AdminService, RoleService, AdminsOnRolesService],
})
export class AdminModule {}
