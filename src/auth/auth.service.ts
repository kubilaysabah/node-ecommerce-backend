import { Injectable } from "@nestjs/common";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";

@Injectable()
export class AuthService {
  register(registerDTO: RegisterDTO) {
    return "This action adds a new auth";
  }

  login(loginDTO: LoginDTO) {
    return `This action returns all auth`;
  }
}
