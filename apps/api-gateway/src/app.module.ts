import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { envSchema } from "./env/env";
import { EnvModule } from "./env/env.module";
import { HttpModule } from "./http/http.module";
import { VerifyModule } from "./validation/validation.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		LoggerModule.forRoot({ pinoHttp: {} }),
		EnvModule,
		HttpModule,
		VerifyModule,
	],
})
export class AppModule {}
