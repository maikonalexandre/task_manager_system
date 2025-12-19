import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppService } from './domain/services/app.service';
import { AppController } from './http/controllers/app.controller';
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
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
