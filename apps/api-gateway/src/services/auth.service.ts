import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { UserLoginProps, UserRegisterProps } from "@repo/shared";
import { firstValueFrom } from "rxjs";
import { EnvService } from "src/env/env.service";

@Injectable()
export class AuthService {
	private readonly authServiceUrl: string;

	constructor(
		private readonly env: EnvService,
		private readonly http: HttpService,
	) {
		this.authServiceUrl = this.env.get("AUTH_SERVICE_API_URL");
	}

	async register(userProps: UserRegisterProps) {
		const url = `${this.authServiceUrl}/register`;
		const response = await firstValueFrom(this.http.post(url, userProps));

		return response.data;
	}

	async login(loginProps: UserLoginProps) {
		const url = `${this.authServiceUrl}/login`;
		const response = await firstValueFrom(this.http.post(url, loginProps));

		return response.data;
	}

	async refresh(token: string) {
		const url = `${this.authServiceUrl}/refresh`;
		const response = await firstValueFrom(this.http.post(url, {}));

		return response.data;
	}
}
