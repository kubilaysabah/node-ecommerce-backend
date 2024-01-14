import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'
import { Users } from '@prisma/client'

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) {}

  findOne(email: string): Promise<Users> {
    return this.prismaService.users.findFirst({
      where: {
        email
      }
    })
  }
}
