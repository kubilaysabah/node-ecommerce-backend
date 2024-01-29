import {HttpException, Injectable, UnauthorizedException} from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client'

import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";

import { UserService } from '@admin/user/user.service';
import { RoleService } from '@admin/role/role.service';

import { PrismaService } from '@shared/prisma.service'
import { ValidateUserEntity } from "@auth/entities/register.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private userService: UserService,
    private roleService: RoleService,
    private jwtService: JwtService
  ) {
  }

  async validateUser({ email, password } : LoginDTO): Promise<ValidateUserEntity | null> {
    const user = await this.userService.findOne({ email });

    if(user && user.password === password) {
      return {
        email: user.email,
        phone: user.phone,
        firstname: user.firstname,
        lastname: user.lastname,
        image: user.image,
        id: user.id,
      }
    }

    return null;
  }

  async register({ email, password, role, lastname, phone, firstname }: RegisterDTO): Promise<Users> {

    const findUser = await this.userService.findOne({ email });

    if(findUser) {
      throw new HttpException('User already exists', 409);
    }

    try {
      return this.prismaService.users.create({
        data: {
          email,
          phone,
          firstname,
          lastname,
          password,
          role: {
            connect: {
                id: role
            }
          }
        }
      });

    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async login(loginDTO: LoginDTO) {
    try {
      const user = await this.validateUser(loginDTO);

      return this.jwtService.sign({
        user,
      })
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
