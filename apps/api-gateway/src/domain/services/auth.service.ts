import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	register(): string {
		return 'OK';
	}

	login() {
		return 'OK';
	}

	refresh() {
		return 'OK';
	}
}
