import {HttpException, Injectable, UnauthorizedException} from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { Users } from '@prisma/client'

import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";

import { PrismaService } from '../../services/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private userService: UserService,
    private roleService: RoleService,
    private jwtService: JwtService
  ) {
  }

  async validateUser({ email, password } : LoginDTO) {
    const findUser = await this.userService.findOne({ email });

    const role = await this.roleService.findOne(findUser.roleId)

    if(!findUser || !role || role.name !== 'admin') {
      throw new UnauthorizedException();
    }

    const match = await bcrypt.compare(password, findUser.password);

    if(!match) {
      throw new UnauthorizedException();
    }

    return findUser;
  }

  async register({ email, password, role, lastname, phone, firstname }: RegisterDTO): Promise<Users> {

    try {
      const hash = await bcrypt.hash(password, 10);

      return this.prismaService.users.create({
        data: {
          email,
          phone,
          firstname,
          lastname,
          password: hash,
          role: {
            connect: {
                id: role
            }
          }
        }
      });

    } catch (error) {
      throw new HttpException('', error)
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
