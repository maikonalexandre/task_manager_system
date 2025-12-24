import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupApp } from "./infra/bootstrap/setup";
import { ENV } from "./infra/env/env";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {});

	const configService: ConfigService<ENV, true> = app.get(ConfigService);
	const port = configService.get("PORT", { infer: true });

	setupApp(app);

	await app.listen(port);
}

bootstrap();
