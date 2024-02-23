import { Module } from '@nestjs/common';
import { AdminsOnRolesService } from './admins-on-roles.service';
import { AdminsOnRolesController } from './admins-on-roles.controller';

@Module({
  controllers: [AdminsOnRolesController],
  providers: [AdminsOnRolesService],
})
export class AdminsOnRolesModule {}
