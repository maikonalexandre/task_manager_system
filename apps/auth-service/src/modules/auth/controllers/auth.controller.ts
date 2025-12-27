import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from "@nestjs/common";
import { GetCurrentUser } from "src/common/current-user-decorator";
import { JwtRefreshAuthGuard } from "src/common/jwt.guard";
import { AuthService } from "../../../modules/auth/services/auth.service";
import { LoginUserDto } from "../dto/login-user.dto";
import { RegisterUserDto } from "../dto/register-user.dto";

@Controller("")
export class AuthController {
	constructor(private readonly auth: AuthService) {}

	@Post("register")
	registerUser(@Body() registerUserDto: RegisterUserDto) {
		return this.auth.register(registerUserDto);
	}

	@Post("login")
	@HttpCode(HttpStatus.OK)
	login(@Body() loginUserDto: LoginUserDto) {
		return this.auth.login(loginUserDto);
	}

	@Post("refresh")
	@UseGuards(JwtRefreshAuthGuard)
	@HttpCode(HttpStatus.OK)
	refresh(@GetCurrentUser() user: { sub: string }) {
		return this.auth.refresh(user.sub);
	}
}
