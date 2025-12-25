import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { CreateTaskProps } from "@repo/shared";
import { firstValueFrom } from "rxjs";
import { EnvService } from "src/config/env/env.service";

@Injectable()
export class TasksService {
	private readonly tasksServiceUrl: string;

	constructor(
		private readonly env: EnvService,
		private readonly http: HttpService,
	) {
		this.tasksServiceUrl = this.env.get("TASKS_SERVICE_API_URL");
	}

	async create(createTaskProps: CreateTaskProps, userId: string) {
		const url = `${this.tasksServiceUrl}/tasks`;

		const response = await firstValueFrom(
			this.http.post(url, createTaskProps, {
				headers: { "x-user-id": userId },
			}),
		);

		return response.data;
	}
}
