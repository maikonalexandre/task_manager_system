import {
	Body,
	Controller,
	Headers,
	HttpCode,
	HttpStatus,
	Post,
} from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { LoginUserDto } from "../dto/login-user.dto";
import { RegisterUserDto } from "../dto/register-user.dto";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly auth: AuthService) {}

	@Post("register")
	@ApiOperation({ summary: "Register a new user" })
	@ApiCreatedResponse({ description: "User created" })
	@ApiBadRequestResponse({ description: "Invalid user's data" })
	@ApiConflictResponse({ description: "There is a user with the same email" })
	registerUser(@Body() registerUserDto: RegisterUserDto) {
		return this.auth.register(registerUserDto);
	}

	@Post("login")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Login with user and password" })
	@ApiOkResponse({ description: "Successful login" })
	@ApiBadRequestResponse({ description: "Invalid data" })
	@ApiUnauthorizedResponse({ description: "Invalid user's credentials" })
	login(@Body() loginUserDto: LoginUserDto) {
		return this.auth.login(loginUserDto);
	}

	@Post("refresh")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Generate a new auth token" })
	@ApiOkResponse({ description: "New auth token generated" })
	@ApiUnauthorizedResponse({ description: "Invalid refresh token" })
	refresh(@Headers("x-refresh-token") header: string) {
		return this.auth.refresh(header);
	}
}
