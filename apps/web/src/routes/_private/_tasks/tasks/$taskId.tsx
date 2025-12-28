import { createFileRoute } from "@tanstack/react-router";
import { getTaskQueryConfig } from "../../../../features/private/tasks/query";
import { TaskDetailsPage } from "../../../../features/private/tasks/taskId";

export const Route = createFileRoute("/_private/_tasks/tasks/$taskId")({
	component: TaskDetailsPage,
	loader: ({ context: { queryClient }, params: { taskId } }) => {
		return queryClient.ensureQueryData(
			getTaskQueryConfig({
				id: taskId,
			}),
		);
	},
	pendingComponent: () => <div>Loading...</div>,
});
