import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { hosts, services } from "@repo/shared";
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
		ClientsModule.register([
			{
				name: services.AUTH,
				transport: Transport.TCP,
				options: {
					host: hosts.AUTH,
					port: 3002,
				},
			},
		]),
	],
	controllers: [HealthController, AuthController],
	providers: [AuthService],
})
export class AppModule {}
