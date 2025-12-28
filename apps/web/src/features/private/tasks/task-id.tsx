import { Card, CardContent, CardTitle, cn } from "@repo/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Route } from "../../../routes/_private/_tasks/tasks/$taskId";
import { TasksForm } from "./components/form";
import { TASK_PRIORITY_BORDER_COLOR_MAP } from "./components/task-card";
import { getTaskQueryConfig } from "./query";

export const TaskDetailsPage = () => {
	const taskId = Route.useParams().taskId;
	const { data } = useSuspenseQuery(getTaskQueryConfig({ id: taskId }));

	return (
		<div className="px-4">
			<Card
				className={cn(
					"px-4 border-l-2 border-l-red-500",
					TASK_PRIORITY_BORDER_COLOR_MAP[data.priority],
				)}
			>
				<CardTitle className="mx-4 text-zinc-700">Detalhes da task</CardTitle>
				<CardContent>
					<TasksForm task={data} />
				</CardContent>
			</Card>
		</div>
	);
};
