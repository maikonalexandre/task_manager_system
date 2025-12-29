import { Button, Card, CardContent, CardTitle, cn } from "@repo/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Save, Trash } from "lucide-react";
import { toast } from "sonner";
import { Route } from "../../../routes/_private/_tasks/tasks/$taskId";
import { TASK_FORM_ID, TasksForm } from "./components/form";
import { TASK_PRIORITY_BORDER_COLOR_MAP } from "./components/task-card";
import { TaskComments } from "./components/task-comments";
import { useDeleteTaskMutation } from "./hooks/useDeleteTaskMutation";
import { getTaskQueryConfig } from "./query";

export const TaskDetailsPage = () => {
	const taskId = Route.useParams().taskId;
	const { data } = useSuspenseQuery(getTaskQueryConfig({ id: taskId }));
	const { mutate } = useDeleteTaskMutation();
	const navigate = useNavigate();

	const handleDeleteTask = () => {
		mutate(
			{ id: taskId },
			{
				onSuccess: () => {
					toast.success("Task deletada com sucesso!");
					navigate({ href: "/" });
				},
			},
		);
	};

	return (
		<div className="px-4 pb-16">
			<Card
				className={cn(
					"px-4 border-l-2 border-l-red-500",
					TASK_PRIORITY_BORDER_COLOR_MAP[data.priority],
				)}
			>
				<div className="flex justify-between items-center">
					<CardTitle className="mx-4 text-zinc-700">Detalhes da task</CardTitle>
					<div className="flex justify-between items-center gap-2">
						<Button
							type="submit"
							size="icon-sm"
							variant="secondary"
							className="rounded-sm cursor-pointer"
							form={TASK_FORM_ID}
						>
							<Save />
						</Button>
						<Button
							size="icon-sm"
							variant="secondary"
							className="rounded-sm cursor-pointer"
							onClick={handleDeleteTask}
						>
							<Trash />
						</Button>
					</div>
				</div>
				<CardContent>
					<TasksForm task={data} />
					<TaskComments taskId={taskId} />
				</CardContent>
			</Card>
		</div>
	);
};
