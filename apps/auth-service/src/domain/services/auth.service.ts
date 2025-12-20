import { Injectable } from "@nestjs/common";
import { UserLoginProps, UserRegisterProps } from "@repo/shared";

@Injectable()
export class AuthService {
	register(registerProps: UserRegisterProps) {
		console.log("user", registerProps);
		return "OK";
	}

	login(loginProps: UserLoginProps) {
		console.log("user", loginProps);
		return "OK";
	}

	refresh() {
		return "OK";
	}
}
