import type { ApiResponse, Metadada, Task } from "@repo/shared";
import {
	queryOptions,
	type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { TasksService } from "./api";
import { getTasksQueryKey } from "./key";

interface GetAllTasksQueryResponse {
	tasks: Task[];
	meta: Metadada;
}

export const getAllTasksQueryConfig = ({
	options,
}: {
	options?: Partial<
		UseSuspenseQueryOptions<ApiResponse<GetAllTasksQueryResponse>>
	>;
} = {}) => {
	return queryOptions({
		queryKey: getTasksQueryKey.all,
		queryFn: TasksService.getAll,
		...options,
	});
};
