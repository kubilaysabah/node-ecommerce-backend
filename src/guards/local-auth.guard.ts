import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
	// async canActivate(context: any) {
	// 	const result = (await super.canActivate(context)) as boolean;
	// 	const request = context.switchToHttp().getRequest();
	// 	await super.logIn(request);
	// 	return result;
	// }
}