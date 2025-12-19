import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../../domain/services/auth.service';

@Controller('/auth')
export class AuthController {
	constructor(private readonly auth: AuthService) {}

	@Post('/register')
	registerUser(): string {
		return this.auth.register();
	}

	@Get('/login')
	login() {
		return this.auth.login();
	}

	@Post('/refresh')
	refresh() {
		return this.auth.refresh();
	}
}
