import type { Task } from "@repo/shared";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { TaskCard } from "./components/task-card";
import { TaskCardSkeleton } from "./components/task-card-skeleton";
import { getAllTasksQueryConfig } from "./query";

export const TasksListPage = () => {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useSuspenseInfiniteQuery(getAllTasksQueryConfig());

	const { ref, inView } = useInView({ threshold: 0.1 });

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const allTasks = data?.pages.flatMap((page) => page.tasks) ?? [];

	return (
		<div className="pb-8">
			<div className="px-4 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:balance]">
				{!data && <p>Task não encontrada</p>}
				{allTasks?.map((task: Task) => {
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

				{isFetchingNextPage &&
					Array.from({ length: 6 }).map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: Used only to static loading
						<TaskCardSkeleton key={i} index={i} />
					))}
			</div>

			<div ref={ref} className="flex justify-center py-10">
				{!isFetchingNextPage && (
					<span className="text-sm text-muted-foreground">
						Você chegou ao fim!
					</span>
				)}
			</div>
		</div>
	);
};
