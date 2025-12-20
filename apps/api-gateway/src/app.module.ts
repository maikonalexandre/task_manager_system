import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { AuthService } from "./domain/services/auth.service";
import { AuthController } from "./http/controllers/auth.controller";
import { HealthController } from "./http/controllers/health.controller";
import { envSchema } from "./infra/config/env";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
		}),
		LoggerModule.forRoot({
			pinoHttp: {},
		}),
	],
	controllers: [HealthController, AuthController],
	providers: [AuthService],
})
export class AppModule {}
