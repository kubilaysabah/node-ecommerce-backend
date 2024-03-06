import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { Role } from '@enums/role.enum'
import { ROLES_KEY } from '@decorators/role.decorator'

import { Admin } from '@modules/admin/entities/admin.entity'
import { RoleService } from '@modules/role/role.service'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private roleService: RoleService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

		if (!requiredRoles) {
			return true
		}

		const { admin }: { admin: Admin } = context.switchToHttp().getRequest()

		if (!admin) {
			throw new UnauthorizedException()
		}

		const findRole = await this.roleService.find({ id: admin.role_id })

		if (!findRole) {
			throw new UnauthorizedException()
		}

		return requiredRoles.some((role) => role.includes(findRole.name))
	}
}
