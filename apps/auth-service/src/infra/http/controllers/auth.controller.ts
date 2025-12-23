import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { GetCurrentUser } from "src/infra/auth/current-user-decorator";
import { JwtRefreshAuthGuard } from "src/infra/auth/jwt.guard";
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

	@UseGuards(JwtRefreshAuthGuard)
	@Post("/refresh")
	refresh(@GetCurrentUser() user: { sub: string }) {
		return this.auth.refresh(user.sub);
	}
}
