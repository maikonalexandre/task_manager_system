import { INestApplication, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '../config/swagger';

export function setupApp(app: INestApplication) {
	setupSwagger(app);
	app.setGlobalPrefix('api');
	app.enableCors({
		origin: '*',
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // Remove propriedades que não estão no DTO
			// forbidNonWhitelisted: true, // Retorna erro se houver propriedades não permitidas
			transform: true, // Transforma os tipos primitivos para os tipos do DTO
		}),
	);

	// app.useGlobalInterceptors()
}
