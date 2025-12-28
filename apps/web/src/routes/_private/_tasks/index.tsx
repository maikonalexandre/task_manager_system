import { createFileRoute } from "@tanstack/react-router";
import { TasksListPage } from "../../../features/private/tasks";
import { TasksPageSkeleton } from "../../../features/private/tasks/components/tasks-page-skeleton";
import { getAllTasksQueryConfig } from "../../../features/private/tasks/query";

export const Route = createFileRoute("/_private/_tasks/")({
	component: TasksListPage,
	pendingComponent: TasksPageSkeleton,
	loader: ({ context: { queryClient } }) => {
		return queryClient.ensureInfiniteQueryData(getAllTasksQueryConfig());
	},
});
