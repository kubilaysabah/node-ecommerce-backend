import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

import { AppService } from "./app.service";

import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [AuthModule, UserModule, RoleModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
