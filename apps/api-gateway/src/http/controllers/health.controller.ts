import { Controller, Get } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { HealthService } from '../../domain/services/health.service';

@Controller()
export class HealthController {
	constructor(
		private readonly health: HealthService,
		public logger: Logger,
	) {}

	@Get()
	getHello(): string {
		return this.health.getHello();
	}
}
