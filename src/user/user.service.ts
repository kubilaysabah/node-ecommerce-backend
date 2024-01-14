import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) {}

  findOne(email: string) {
    return this.prismaService.users.findFirst({
      where: {
        email
      }
    })
  }
}
