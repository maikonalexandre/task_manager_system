import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../../common/jwt.strategy";
import { EnvService } from "../../config/env/env.service";

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
export class ValidationModule {}
