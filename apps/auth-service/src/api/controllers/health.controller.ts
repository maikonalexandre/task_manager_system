import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { messages } from "@repo/shared";

@Controller()
export class HealthController {
	@MessagePattern({ cmd: messages.HEALTH_CHECK })
	check() {
		return {
			status: "ok",
			service: "auth-service",
			timestamp: new Date().toISOString(),
		};
	}
}
