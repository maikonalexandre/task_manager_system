import {
	queryOptions,
	type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { TasksService } from "./api";
import { getTasksQueryKey } from "./key";

export const getAllTasksQueryConfig = ({
	options,
}: {
	options?: Partial<UseSuspenseQueryOptions>;
} = {}) => {
	return queryOptions({
		queryKey: getTasksQueryKey.all,
		queryFn: TasksService.getAll,
		...options,
	});
};
