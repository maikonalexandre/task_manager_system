import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { envSchema } from "./config/env/env";
import { EnvModule } from "./config/env/env.module";
import { TaskModule } from "./modules/tasks/task.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		LoggerModule.forRoot({ pinoHttp: {} }),
		EnvModule,
		TaskModule,
	],
})
export class AppModule {}
