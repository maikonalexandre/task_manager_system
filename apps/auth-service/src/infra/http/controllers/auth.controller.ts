import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../../../domain/services/auth.service";
import { LoginUserDto } from "../dto/login-user.dto";
import { RegisterUserDto } from "../dto/register-user.dto";

@Controller("/auth")
export class AuthController {
	constructor(private readonly auth: AuthService) {}

	@Post("/register")
	registerUser(@Body() registerUserDto: RegisterUserDto) {
		return this.auth.register(registerUserDto);
	}

	@Post("/login")
	login(@Body() loginUserDto: LoginUserDto) {
		return this.auth.login(loginUserDto);
	}

	@Post("/refresh")
	refresh() {
		return this.auth.refresh();
	}
}
