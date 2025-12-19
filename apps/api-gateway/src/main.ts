import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ENV } from './config/env';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {});

	const configService: ConfigService<ENV, true> = app.get(ConfigService);
	const port = configService.get('PORT', { infer: true });

	const docConfig = new DocumentBuilder()
		.setTitle('Task Manager api docs')
		.setDescription('')
		.setVersion('1.0')
		.build();

	const documentFactory = () => SwaggerModule.createDocument(app, docConfig);
	SwaggerModule.setup('api/docs', app, documentFactory);

	await app.listen(port);
}
bootstrap();
