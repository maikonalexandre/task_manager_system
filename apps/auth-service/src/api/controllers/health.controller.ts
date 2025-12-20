import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { messages } from "@repo/shared";

@Controller()
export class HealthController {
	@MessagePattern(messages.AUTH_MESSAGES.HEALTH_CHECK)
	check() {
	  console.log("OK")

		return {
			status: "ok",
			service: "auth-service",
			timestamp: new Date().toISOString(),
		};
	}
}
