import { Controller, Get, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findOne(@Query('email') email: string, @Query('id') id: string) {

    if(!email && !id) {
        return this.userService.findAll();
    }

    return this.userService.findOne({ email, id })
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
