import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { EnvService } from "../env/env.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			verifyOptions: {
				algorithms: ["RS256"],
			},
		}),
	],
	providers: [EnvService, JwtStrategy],
})
export class VerifyModule {}
