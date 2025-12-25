import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import {
	CreateCommentProps,
	CreateTaskProps,
	PaginationQueryProps,
	UpdateTaskProps,
} from "@repo/shared";
import { firstValueFrom } from "rxjs";
import { EnvService } from "src/config/env/env.service";

@Injectable()
export class CommentService {
	private readonly tasksServiceUrl: string;

	constructor(
		private readonly env: EnvService,
		private readonly http: HttpService,
	) {
		this.tasksServiceUrl = this.env.get("TASKS_SERVICE_API_URL");
	}

	async create(
		taskId: string,
		userId: string,
		createCommentProps: CreateCommentProps,
	) {
		const url = `${this.tasksServiceUrl}/tasks/${taskId}/comments`;
		const response = await firstValueFrom(
			this.http.post(url, createCommentProps, {
				headers: { "x-user-id": userId },
			}),
		);

		return response.data;
	}

	async findAll(
		paginationQuery: PaginationQueryProps,
		taskId: string,
		userId: string,
	) {
		const queryParams = new URLSearchParams({
			page: paginationQuery.page.toString(),
			size: paginationQuery.size.toString(),
		}).toString();

		const url = `${this.tasksServiceUrl}/tasks/${taskId}/comments?${queryParams}`;
		const response = await firstValueFrom(
			this.http.get(url, { headers: { "x-user-id": userId } }),
		);

		return response.data;
	}
}
