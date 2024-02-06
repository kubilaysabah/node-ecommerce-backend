import { Module } from '@nestjs/common'

import { SharedModule } from '@shared/shared.module'
import { AdminModule } from '@modules/admin/admin.module'
import { UserModule } from '@modules/user/user.module'
import { SellerModule } from '@modules/seller/seller.module'

@Module({
	imports: [SharedModule, AdminModule, SellerModule, UserModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
