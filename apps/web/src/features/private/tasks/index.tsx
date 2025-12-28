import type { Task } from "@repo/shared";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { TaskCard } from "./components/task-card";
import { getAllTasksQueryConfig } from "./query";

export const TasksListPage = () => {
	const { data } = useSuspenseQuery(getAllTasksQueryConfig());

	return (
		<div className="px-4 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:balance]">
			{!data && <p>Task não encontrada</p>}
			{data?.tasks.map((task: Task) => {
				return (
					<Link
						key={task.id}
						to="/tasks/$taskId"
						params={{ taskId: task.id }}
						className="block mb-4 break-inside-avoid"
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
