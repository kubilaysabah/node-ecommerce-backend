import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "@modules/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
   super(); // config
  }

  async validate({ email, password }: { email: string, password: string }): Promise<any> {
    const user = await this.authService.validateUser({ email, password });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}