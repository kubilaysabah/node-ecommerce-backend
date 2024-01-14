import { Injectable, UnauthorizedException  } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

import { UserService } from '../user/user.service';
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private userService: UserService,
    private jwtService: JwtService
  ) {
  }

  async validateUser({ email, password } : LoginDTO) {
    const findUser = await this.userService.findOne(email);

    if(!findUser) {
      throw new UnauthorizedException();
    }

    const match = await bcrypt.compare(password, findUser.password);

    if(!match) {
      throw new Error('Invalid credentials');
    }

    return findUser;
  }

  async register(registerDTO: RegisterDTO) {

    try {
      const hash = await bcrypt.hash(registerDTO.password, 10);

      return this.prismaService.users.create({
        data: {
          ...registerDTO,
          password: hash
        }
      });

    } catch (error) {
      console.error(error)
    }

    return 'hello'
  }

  async login(loginDTO: LoginDTO) {
    try {
      const user = await this.validateUser(loginDTO);

      return this.jwtService.sign({
        email: user.email,
        phone: user.phone,
        firstname: user.firstname,
        lastname: user.lastname,
        image: user.image
      })
    } catch (error) {
      console.error(error)
    }
  }
}
