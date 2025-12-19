import { INestApplication } from '@nestjs/common';
import { setupSwagger } from '../config/swagger';

export function setupApp(app: INestApplication) {
	setupSwagger(app);

	// aqui entram depois:
	// app.enableCors()
	// app.useGlobalPipes()
	// app.useGlobalInterceptors()
}
