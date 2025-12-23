import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserTokenPayload } from "@repo/shared";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvService } from "../env/env.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(env: EnvService) {
		const publicKey = env.get("JWT_PUBLIC_KEY");

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: Buffer.from(publicKey, "base64"),
			algorithms: ["RS256"],
		});
	}

	validate(token: UserTokenPayload) {
		return token;
	}
}

@Injectable()
export class JwtStrategyRefresh extends PassportStrategy(
	Strategy,
	"jwt-refresh",
) {
	constructor(env: EnvService) {
		super({
			jwtFromRequest: ExtractJwt.fromHeader("x-refresh-token"),
			secretOrKey: env.get("REFRESH_JWT_SECRET"),
			algorithms: ["HS256"],
		});
	}

	validate(token: UserTokenPayload) {
		return token;
	}
}
