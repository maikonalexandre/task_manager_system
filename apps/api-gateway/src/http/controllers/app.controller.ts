import { Controller, Get } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { AppService } from '../../domain/services/app.service';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		public logger: Logger,
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}
