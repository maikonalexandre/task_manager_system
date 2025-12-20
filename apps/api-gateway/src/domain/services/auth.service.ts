import { Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/http/dto/login-user.dto';
import { RegisterUserDto } from 'src/http/dto/register-user.dto';

@Injectable()
export class AuthService {
	register(userDto: RegisterUserDto) {
		console.log('user', userDto);
		return 'OK';
	}

	login(loginDto: LoginUserDto) {
		console.log('user', loginDto);
		return 'OK';
	}

	refresh() {
		return 'OK';
	}
}
