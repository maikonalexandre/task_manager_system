import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import {
	CreateTaskProps,
	PaginationQueryProps,
	UpdateTaskProps,
} from "@repo/shared";
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

	async delete(taskId: string, userId: string) {
		const url = `${this.tasksServiceUrl}/tasks/${taskId}`;
		const response = await firstValueFrom(
			this.http.delete(url, { headers: { "x-user-id": userId } }),
		);

		return response.data;
	}

	async get(taskId: string, userId: string) {
		const url = `${this.tasksServiceUrl}/tasks/${taskId}`;
		const response = await firstValueFrom(
			this.http.get(url, { headers: { "x-user-id": userId } }),
		);

		return response.data;
	}

	async findAll(paginationQuery: PaginationQueryProps, userId: string) {
		const queryParams = new URLSearchParams({
			page: paginationQuery.page.toString(),
			size: paginationQuery.size.toString(),
		}).toString();

		const url = `${this.tasksServiceUrl}/tasks?${queryParams}`;
		const response = await firstValueFrom(
			this.http.get(url, { headers: { "x-user-id": userId } }),
		);

		return response.data;
	}

	async update(taskId: string, userId: string, updateTaskDto: UpdateTaskProps) {
		const url = `${this.tasksServiceUrl}/tasks/${taskId}`;
		const response = await firstValueFrom(
			this.http.put(url, updateTaskDto, {
				headers: { "x-user-id": userId },
			}),
		);

		return response.data;
	}
}
