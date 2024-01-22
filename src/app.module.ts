import { Module } from "@nestjs/common";

import { SharedModule } from './shared/shared.module'
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module'
import { BrandModule } from './modules/brand/brand.module'

@Module({
  imports: [SharedModule, AuthModule, UserModule, RoleModule, CategoryModule, ProductModule, BrandModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
