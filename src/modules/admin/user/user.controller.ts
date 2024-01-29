import { Controller, Get, Body, Patch, Param, Query, Delete, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthenticatedGuard } from "@guards/authenticated.guard";

@ApiTags('admin/user')
@Controller('admin/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  findOne(@Query('email') email: string, @Query('id') id: string) {

    if(!email && !id) {
        return this.userService.findAll();
    }

    return this.userService.findOne({ email, id })
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
