import { Body, Controller, Get, Post } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { AuthService } from '../../domain/services/auth.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('/auth')
export class AuthController {
	constructor(private readonly auth: AuthService) {}

	@Post('/register')
	@ApiOperation({ summary: 'Registrar um novo usuário' })
	@ApiCreatedResponse({ description: 'Usuário criado com sucesso.' })
	@ApiBadRequestResponse({ description: 'Os dados do usuario sao invalidos' })
	registerUser(@Body() registerUserDto: RegisterUserDto) {
		return this.auth.register(registerUserDto);
	}

	@Post('/login')
	@ApiOperation({ summary: 'Fazer login do usuario' })
	@ApiOkResponse({ description: 'Usuario logado com sucesso' })
	@ApiBadRequestResponse({ description: 'Os dados do usuario sao invalidos' })
	login(@Body() loginUserDto: LoginUserDto) {
		return this.auth.login(loginUserDto);
	}

	@Post('/refresh')
	refresh() {
		return this.auth.refresh();
	}
}
