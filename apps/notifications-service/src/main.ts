import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { RABBITMQ_CONFIG } from "@repo/shared";
import { AppModule } from "./app.module";
import { setupApp } from "./config/bootstrap/setup";
import { ENV } from "./config/env/env";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {});
	const configService: ConfigService<ENV, true> = app.get(ConfigService);
	const port = configService.get("PORT", { infer: true });
	const rabbitmq_url = configService.get("RABBITMQ_URL", { infer: true });

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.RMQ,
		options: {
			urls: [rabbitmq_url],
			queue: RABBITMQ_CONFIG.TASKS_QUEUE,
			queueOptions: {
				durable: true,
			},
		},
	});

	setupApp(app);

	await app.startAllMicroservices();
	await app.listen(port);
}

bootstrap();
