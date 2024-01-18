import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client'

import { PrismaService } from '../prisma.service'
import { FindUserParams } from './dto/find-user.dto'
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

  findAll() {
    return this.prismaService.users.findMany();
  }

  update(id:number, { role, email, image, lastname, phone, password, firstname }: UpdateUserDto) {
    return this.prismaService.users.update({
      where: {
        id,
      },
      data: {
        firstname,
        lastname,
        email,
        phone,
        password,
        image,
        role: {
          connect: {
            id: role
          }
        }
      }
    })
  }

  remove(id: number) {
    return this.prismaService.users.delete({
      where: {
        id
      }
    })
  }
}
