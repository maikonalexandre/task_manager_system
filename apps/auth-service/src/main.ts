import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { setupApp } from "./infra/bootstrap/setup";
import { ENV } from "./infra/config/env";

async function bootstrap() {
	const appContext = await NestFactory.createApplicationContext(AppModule);
	const configService: ConfigService<ENV, true> = appContext.get(ConfigService);

	const port = configService.get("PORT", { infer: true });
	const host = configService.get("HOST", { infer: true });

	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.TCP,
			options: {
				port,
				host,
			},
		},
	);

	setupApp(app);
	await app.listen();
	await appContext.close(); // close context to don't cause memory leaks
}

bootstrap();
