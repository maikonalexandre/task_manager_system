import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { envSchema } from "./infra/env/env";
import { EnvModule } from "./infra/env/env.module";
import { HttpModule } from "./infra/http/http.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		LoggerModule.forRoot({ pinoHttp: {} }),
		EnvModule,
		HttpModule,
	],
})
export class AppModule {}
