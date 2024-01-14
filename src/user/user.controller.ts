import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  findOne(email: string) {
    return this.userService.findOne(email);
  }
}
