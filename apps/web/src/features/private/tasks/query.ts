import type { CommentProps, PaginationProps, Task } from "@repo/shared";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { TasksService } from "./api";
import { getTasksQueryKey } from "./key";

interface GetAllTasksQueryResponse {
	tasks: Task[];
	meta: PaginationProps;
}

interface GetTaskCommentsResponse {
	comments: CommentProps[];
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

export const getTaskCommentsQueryConfig = ({ id }: { id: string }) => {
	return infiniteQueryOptions({
		initialPageParam: 1,
		queryKey: getTasksQueryKey.comments({ id }),
		queryFn: async ({ pageParam = 1 }): Promise<GetTaskCommentsResponse> =>
			await TasksService.getComments({
				page: pageParam as number,
				size: 10,
				id,
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
