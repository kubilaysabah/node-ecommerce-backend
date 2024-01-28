import { HttpException, Injectable } from "@nestjs/common";
import { Users } from '@prisma/client'

import { PrismaService } from '@shared/prisma.service'
import { FindUserParams } from './dto/find-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) {}

  findOne({ email, id }: FindUserParams): Promise<Users> {
    try {
      return this.prismaService.users.findUnique({
        where: {
          ...(id ? { id: +id } : { email })
        }
      })
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  findAll() {
    return this.prismaService.users.findMany();
  }

  update(id:number, { role, email, image, lastname, phone, password, firstname }: UpdateUserDto) {
    try {
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
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  remove(id: number) {
    try {
      return this.prismaService.users.delete({
        where: {
          id
        }
      })
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
