import { Controller, Get } from "@nestjs/common";

@Controller()
export class HealthController {
	@Get("health")
	check() {
		console.log("OK");

		return {
			status: "ok",
			service: "auth-service",
			timestamp: new Date().toISOString(),
		};
	}
}
