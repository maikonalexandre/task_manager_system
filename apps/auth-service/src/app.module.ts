import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { HealthController } from "./api/controllers/health.controller";
import { envSchema } from "./infra/config/env";
import { AuthController } from "./api/controllers/auth.controller";
import { AuthService } from "./domain/services/auth.service";

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
	providers: [ AuthService],
})
export class AppModule {}
