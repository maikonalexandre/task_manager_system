import { INestMicroservice, ValidationPipe } from "@nestjs/common";

export function setupApp(app: INestMicroservice) {
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);
}
