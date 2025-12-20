import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { messages, services } from "@repo/shared";
import { lastValueFrom } from "rxjs";

@Controller()
export class HealthController {
	constructor(
		@Inject(services.AUTH) private readonly authClient: ClientProxy,
	) {}

	@Get("/health")
	async check() {
		try {
			const response = await lastValueFrom(
				this.authClient.send(messages.AUTH_MESSAGES.HEALTH_CHECK, {}),
			);

			console.log("Response ->")

			return {
				gateway: "online",
				authService: response,
			};
		} catch (error) {
			return {
				gateway: "online",
				authService: "offline or unreachable",
				// error: error.message,
			};
		}
	}
}
