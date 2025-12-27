import { createFileRoute } from "@tanstack/react-router";
import { TasksListPage } from "../../../features/private/tasks";
import { getAllTasksQueryConfig } from "../../../features/private/tasks/query";

export const Route = createFileRoute("/_private/_tasks/")({
	component: TasksListPage,
	pendingComponent: () => <div>Loading...</div>,
	loader: ({ context: { queryClient } }) => {
		return queryClient.ensureQueryData(getAllTasksQueryConfig());
	},
});
