import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllTasksQueryConfig } from "./query";

export const TasksListPage = () => {
	const { data } = useSuspenseQuery(getAllTasksQueryConfig());

	return (
		<div>
			<div>{JSON.stringify(data)}</div>
		</div>
	);
};
