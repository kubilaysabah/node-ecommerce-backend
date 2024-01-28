import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from '@shared/prisma.service'
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {
  }
  create({ name }: CreateRoleDto) {
    try {
      return this.prisma.roles.create({
        data: {
          name
        }
      });
    } catch(error) {
      throw new HttpException(error.message, error.status)
    }
  }

  findAll() {
    try {
      return this.prisma.roles.findMany();
    } catch(error) {
      throw new HttpException(error.message, error.status)
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.roles.findUnique({
        where: {
          id,
        }
      })
    } catch(error) {
      throw new HttpException(error.message, error.status)
    }
  }

  update(id: number, { name }: UpdateRoleDto) {
    try {
      return this.prisma.roles.update({
        where: {
          id,
        },
        data: {
          name
        }
      })
    } catch(error) {
      throw new HttpException(error.message, error.status)
    }
  }

  remove(id: number) {
    try {
      return this.prisma.roles.delete({
        where: {
          id
        }
      })
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
