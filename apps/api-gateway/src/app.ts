import { INestApplication, ValidationPipe } from "@nestjs/common";
import { setupSwagger } from "./config/swagger";
import { AxiosErrorInterceptor } from "./interceptors/axios-error.interceptor";

export function setupApp(app: INestApplication) {
	setupSwagger(app);
	app.setGlobalPrefix("api");
	app.enableCors({
		origin: "*",
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.useGlobalInterceptors(new AxiosErrorInterceptor());
}
