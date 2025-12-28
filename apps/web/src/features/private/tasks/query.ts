import type { PaginationProps, Task } from "@repo/shared";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { TasksService } from "./api";
import { getTasksQueryKey } from "./key";

interface GetAllTasksQueryResponse {
	tasks: Task[];
	meta: PaginationProps;
}

export const getAllTasksQueryConfig = () => {
	return infiniteQueryOptions({
		initialPageParam: 1,
		queryKey: getTasksQueryKey.all,
		queryFn: async ({ pageParam = 1 }): Promise<GetAllTasksQueryResponse> =>
			await TasksService.getAll({
				page: pageParam as number,
				size: 10,
			}),
		getNextPageParam: (lastpage) => {
			const { current_page, total_pages } = lastpage.meta;
			return current_page < total_pages ? current_page + 1 : undefined;
		},
	});
};

export const getTaskQueryConfig = ({ id }: { id: string }) => {
	return queryOptions({
		queryKey: getTasksQueryKey.detail({ id }),
		queryFn: (): Promise<Task> => TasksService.getById({ id }),
	});
};
