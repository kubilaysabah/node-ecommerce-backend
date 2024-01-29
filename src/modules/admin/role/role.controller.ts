import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";

import { AuthenticatedGuard } from "@guards/authenticated.guard";
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('admin/role')
@Controller('admin/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
