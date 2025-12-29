import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { EnvModule } from "src/config/env/env.module";
import { JwtStrategy } from "../../common/jwt.strategy";
import { EnvService } from "../../config/env/env.service";

@Module({
	imports: [
		PassportModule,
		EnvModule,
		JwtModule.registerAsync({
			imports: [EnvModule],
			inject: [EnvService],
			useFactory: (env: EnvService) => ({
				publicKey: env.get("AUTH_SERVICE_PUBLIC_KEY"),
				verifyOptions: {
					algorithms: ["RS256"],
				},
			}),
		}),
	],
	providers: [EnvService, JwtStrategy],
	exports: [JwtModule],
})
export class ValidationModule {}
