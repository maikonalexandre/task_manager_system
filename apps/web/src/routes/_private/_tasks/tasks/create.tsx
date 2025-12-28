import { createFileRoute } from "@tanstack/react-router";
import { CreateNewTaskPage } from "../../../../features/private/tasks/create";

export const Route = createFileRoute("/_private/_tasks/tasks/create")({
	component: CreateNewTaskPage,
});
