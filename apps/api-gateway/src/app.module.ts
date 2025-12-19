import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { HealthService } from './domain/services/health.service';
import { HealthController } from './http/controllers/health.controller';
import { envSchema } from './infra/config/env';

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
		}),
		LoggerModule.forRoot({
			pinoHttp: {},
		}),
	],
	controllers: [HealthController],
	providers: [HealthService],
})
export class AppModule {}
