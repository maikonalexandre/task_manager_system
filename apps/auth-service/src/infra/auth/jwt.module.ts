import { Module } from "@nestjs/common";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { EnvModule } from "../env/env.module";
import { EnvService } from "../env/env.service";
import { JwtService } from "./jwt.service";
import { JwtStrategy, JwtStrategyRefresh } from "./jwt.strategy";

@Module({
	imports: [
		PassportModule,
		NestJwtModule.registerAsync({
			imports: [EnvModule],
			inject: [EnvService],
			global: true,
			useFactory(env: EnvService) {
				const privateKey = env.get("JWT_PRIVATE_KEY");
				const publicKey = env.get("JWT_PUBLIC_KEY");

				return {
					signOptions: { algorithm: "RS256" },
					privateKey: Buffer.from(privateKey, "base64"),
					publicKey: Buffer.from(publicKey, "base64"),
				};
			},
		}),
	],
	providers: [EnvService, JwtStrategy, JwtStrategyRefresh, JwtService],
	exports: [JwtService],
})
export class JwtModule {}
