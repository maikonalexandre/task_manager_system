import { Controller, Get } from '@nestjs/common';
import { HealthService } from '../../domain/services/health.service';

@Controller()
export class HealthController {
	constructor(private readonly health: HealthService) {}

	@Get('/health')
	getHello(): string {
		return this.health.getHello();
	}
}
