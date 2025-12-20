import { Body, Controller, Post } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
} from "@nestjs/swagger";
import { AuthService } from "../../domain/services/auth.service";
import { LoginUserDto } from "../dto/login-user.dto";
import { RegisterUserDto } from "../dto/register-user.dto";

@Controller("/auth")
export class AuthController {
	constructor(private readonly auth: AuthService) {}

	@Post("/register")
	@ApiOperation({ summary: "Register a new user" })
	@ApiCreatedResponse({ description: "User created" })
	@ApiBadRequestResponse({ description: "Invalid user's data" })
	registerUser(@Body() registerUserDto: RegisterUserDto) {
		return this.auth.register(registerUserDto);
	}

	@Post("/login")
	@ApiOperation({ summary: "Login with user and password" })
	@ApiOkResponse({ description: "Successful login" })
	@ApiBadRequestResponse({ description: "Invalid user's data" })
	login(@Body() loginUserDto: LoginUserDto) {
		return this.auth.login(loginUserDto);
	}

	@Post("/refresh")
	refresh() {
		return this.auth.refresh();
	}
}
