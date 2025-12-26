import { useQuery } from "@tanstack/react-query";
import { TasksService } from "../../../api/tasks";

export const TasksListPage = () => {
	const { data } = useQuery({
		queryFn: TasksService.getAll,
		queryKey: [""],
	});

	console.log("TASKS", data);

	return (
		<div>
			<div>Tasks list page</div>
		</div>
	);
};
