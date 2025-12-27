import type { Task } from "@repo/shared";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { TaskCard } from "./components/task-card";
import { getAllTasksQueryConfig } from "./query";

export const TasksListPage = () => {
	const { data } = useSuspenseQuery(getAllTasksQueryConfig());

	return (
		<div className="px-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{!data && <p>Task não encontrada</p>}
			{data?.data.tasks.map((task: Task) => {
				return (
					<Link
						key={task.id}
						to="/tasks/$taskId"
						params={{
							taskId: task.id,
						}}
					>
						<TaskCard
							title={task.title}
							status={task.status}
							description={task.description}
							deadline={task.deadline}
							priority={task.priority}
						/>
					</Link>
				);
			})}
		</div>
	);
};
