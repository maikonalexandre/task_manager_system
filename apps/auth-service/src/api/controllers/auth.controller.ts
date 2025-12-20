import { Body, Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { messages } from "@repo/shared";
import { AuthService } from "../../domain/services/auth.service";
import { LoginUserDto } from "../dto/login-user.dto";
import { RegisterUserDto } from "../dto/register-user.dto";

@Controller()
export class AuthController {
	constructor(private readonly auth: AuthService) {}

	@MessagePattern(messages.AUTH_MESSAGES.REGISTER)
	registerUser(@Body() registerUserDto: RegisterUserDto) {
		return this.auth.register(registerUserDto);
	}

	@MessagePattern(messages.AUTH_MESSAGES.LOGIN)
	login(@Body() loginUserDto: LoginUserDto) {
		return this.auth.login(loginUserDto);
	}

	@MessagePattern(messages.AUTH_MESSAGES.REFRESH)
	refresh() {
		return this.auth.refresh();
	}
}
