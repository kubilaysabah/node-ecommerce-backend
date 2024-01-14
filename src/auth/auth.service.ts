import { Injectable } from "@nestjs/common";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {
  }

  register(registerDTO: RegisterDTO) {
    return this.prismaService.users.create({
      data: registerDTO
    });
  }

  login(loginDTO: LoginDTO) {
    console.log(loginDTO);
    return `This action returns all auth`;
  }
}
