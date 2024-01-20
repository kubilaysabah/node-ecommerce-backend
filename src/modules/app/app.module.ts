import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

import { AppService } from "./app.service";

import { SharedModule } from '../../shared/shared.module'
import { AuthModule } from "../auth/auth.module";
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [SharedModule, AuthModule, UserModule, RoleModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
