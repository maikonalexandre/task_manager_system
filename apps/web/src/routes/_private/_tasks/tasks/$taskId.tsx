import { createFileRoute } from "@tanstack/react-router";
import { TaskIdSkeleton } from "../../../../features/private/tasks/components/task-id-skeleton";
import {
	getTaskCommentsQueryConfig,
	getTaskQueryConfig,
} from "../../../../features/private/tasks/query";
import { TaskDetailsPage } from "../../../../features/private/tasks/task-id";
import { getAllUsersConfig } from "../../../../features/public/auth/query";

export const Route = createFileRoute("/_private/_tasks/tasks/$taskId")({
	component: TaskDetailsPage,
	loader: ({ context: { queryClient }, params: { taskId } }) => {
		queryClient.ensureQueryData(
			getTaskQueryConfig({
				id: taskId,
			}),
		);

		queryClient.ensureQueryData(getAllUsersConfig());
		queryClient.ensureInfiniteQueryData(
			getTaskCommentsQueryConfig({ id: taskId }),
		);
	},
	pendingComponent: TaskIdSkeleton,
});
