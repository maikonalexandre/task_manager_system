import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { envSchema } from "./config/env/env";
import { EnvModule } from "./config/env/env.module";
import { NotificationModule } from "./modules/notification/notification.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		LoggerModule.forRoot({ pinoHttp: {} }),
		EnvModule,
		NotificationModule,
	],
})
export class AppModule {}
