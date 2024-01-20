import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service'
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {
  }
  create({ name }: CreateRoleDto) {
    return this.prisma.roles.create({
      data: {
        name
      }
    });
  }

  findAll() {
    return this.prisma.roles.findMany();
  }

  findOne(id: number) {
    return this.prisma.roles.findFirst({
      where: {
        id,
      }
    })
  }

  update(id: number, { name }: UpdateRoleDto) {
    return this.prisma.roles.update({
      where: {
        id,
      },
      data: {
        name
      }
    })
  }

  remove(id: number) {
    return this.prisma.roles.delete({
      where: {
        id
      }
    })
  }
}
