import { createFileRoute } from "@tanstack/react-router";
import { TasksListPage } from "../../../features/private/tasks";

export const Route = createFileRoute("/_private/_tasks/")({
	component: TasksListPage,
});
