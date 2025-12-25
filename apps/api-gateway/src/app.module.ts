import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { envSchema } from "./config/env/env";
import { EnvModule } from "./config/env/env.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TasksModule } from "./modules/task/task.module";
import { ValidationModule } from "./modules/validation/validation.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		LoggerModule.forRoot({ pinoHttp: {} }),
		ValidationModule,
		EnvModule,
		AuthModule,
		TasksModule,
	],
})
export class AppModule {}
