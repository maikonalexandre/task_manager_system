import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { tokenPayloadSchema, UserTokenPayload } from "@repo/shared";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvService } from "../env/env.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(env: EnvService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: env.get("JWT_SECRET"),
		});
	}

	validate(token: UserTokenPayload) {
		return tokenPayloadSchema.parse(token);
	}
}

@Injectable()
export class JwtStrategyRefresh extends PassportStrategy(
	Strategy,
	"jwt-refresh",
) {
	constructor(env: EnvService) {
		super({
			jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
			secretOrKey: env.get("REFRESH_JWT_SECRET"),
		});
	}

	validate(token: UserTokenPayload) {
		return tokenPayloadSchema.parse(token);
	}
}
