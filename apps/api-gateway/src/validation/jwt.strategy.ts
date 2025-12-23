import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserTokenPayload } from "@repo/shared";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvService } from "../env/env.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(env: EnvService) {
		const publicKey = env.get("AUTH_SERVICE_PUBLIC_KEY");

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
