import { Injectable } from "@nestjs/common";
import { UserLoginProps, UserRegisterProps } from "@repo/shared";

@Injectable()
export class AuthService {
	register(userDto: UserRegisterProps) {
		console.log("user", userDto);
		return "OK";
	}

	login(loginDto: UserLoginProps) {
		console.log("user", loginDto);
		return "OK";
	}

	refresh() {
		return "OK";
	}
}
