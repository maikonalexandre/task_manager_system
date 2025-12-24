import { Injectable } from "@nestjs/common";
import { JwtService as NestJwtAuthService } from "@nestjs/jwt";
import { UserTokenPayload } from "@repo/shared";
import { EnvService } from "../config/env/env.service";

@Injectable()
export class JwtService {
	constructor(
		private readonly jwt: NestJwtAuthService,
		private readonly env: EnvService,
	) {}

	createAccessToken(payload: UserTokenPayload) {
		return this.jwt.sign(payload, {
			expiresIn: "15m",
		});
	}

	createRefreshToken(payload: UserTokenPayload) {
		return this.jwt.sign(payload, {
			secret: this.env.get("REFRESH_JWT_SECRET"),
			algorithm: "HS256",
			expiresIn: "7d",
		});
	}
}
