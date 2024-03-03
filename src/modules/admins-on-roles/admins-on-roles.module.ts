import { Module } from '@nestjs/common'
import { AdminsOnRolesService } from './admins-on-roles.service'
import { AdminsOnRolesController } from './admins-on-roles.controller'

import { AdminService } from '@modules/admin/admin.service'
import { RoleService } from '@modules/role/role.service'

@Module({
	controllers: [AdminsOnRolesController],
	providers: [AdminsOnRolesService, AdminService, RoleService],
})
export class AdminsOnRolesModule {}
