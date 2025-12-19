import { INestApplication } from '@nestjs/common';
import { setupSwagger } from '../config/swagger';

export function setupApp(app: INestApplication) {
	setupSwagger(app);
	app.enableCors({
		origin: '*',
	});

	// app.useGlobalPipes()
	// app.useGlobalInterceptors()
}
