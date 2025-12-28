import type { PaginationProps, Task } from "@repo/shared";
import {
	queryOptions,
	type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { TasksService } from "./api";
import { getTasksQueryKey } from "./key";

interface GetAllTasksQueryResponse {
	tasks: Task[];
	meta: PaginationProps;
}

export const getAllTasksQueryConfig = ({
	options,
}: {
	options?: Partial<UseSuspenseQueryOptions<GetAllTasksQueryResponse>>;
} = {}) => {
	return queryOptions({
		queryKey: getTasksQueryKey.all,
		queryFn: TasksService.getAll,
		...options,
	});
};

export const getTaskQueryConfig = ({
	options,
	id,
}: {
	id: string;
	options?: Partial<UseSuspenseQueryOptions<Task>>;
}) => {
	return queryOptions({
		queryKey: getTasksQueryKey.detail({ id }),
		queryFn: () => TasksService.getById({ id }),
		...options,
	});
};
