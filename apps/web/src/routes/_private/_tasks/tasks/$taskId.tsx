import { createFileRoute } from "@tanstack/react-router";
import { TaskDetailsPage } from "../../../../features/private/tasks/taskId";

export const Route = createFileRoute("/_private/_tasks/tasks/$taskId")({
	component: TaskDetailsPage,
});
