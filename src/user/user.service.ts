import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client'

import { PrismaService } from '../prisma.service'
import { FindUserParams } from './dto/find-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) {}

  findOne({ email, id }: FindUserParams): Promise<Users> {
    return this.prismaService.users.findFirst({
      where: {
        ...(id ? { id: +id } : { email })
      }
    })
  }

  create({ name }: CreateUserDto) {
    return this.prismaService.roles.create({
      data: {
        name
      }
    });
  }

  findAll() {
    return this.prismaService.roles.findMany();
  }

  update(id:number, { name }: UpdateUserDto) {
    return this.prismaService.roles.update({
      where: {
        id,
      },
      data: {
        name
      }
    })
  }

  remove(id: number) {
    return this.prismaService.roles.delete({
      where: {
        id
      }
    })
  }
}
