import { createFileRoute } from "@tanstack/react-router";
import { TaskIdSkeleton } from "../../../../features/private/tasks/components/task-id-skeleton";
import { getTaskQueryConfig } from "../../../../features/private/tasks/query";
import { TaskDetailsPage } from "../../../../features/private/tasks/task-id";

export const Route = createFileRoute("/_private/_tasks/tasks/$taskId")({
	component: TaskDetailsPage,
	loader: ({ context: { queryClient }, params: { taskId } }) => {
		return queryClient.ensureQueryData(
			getTaskQueryConfig({
				id: taskId,
			}),
		);
	},
	pendingComponent: TaskIdSkeleton,
});
