import { Module } from '@nestjs/common'

import { SharedModule } from '@shared/shared.module'
import { AuthModule } from '@modules/auth/auth.module'
import { AdminModule } from '@modules/admin/admin.module'

@Module({
  imports: [SharedModule, AuthModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
