import { TaskCardSkeleton } from "./task-card-skeleton";

export const TasksPageSkeleton = () => {
	return (
		<div className="px-4 py-6">
			<div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:balance]">
				{Array.from({ length: 9 }).map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: Used only to static loading
					<TaskCardSkeleton key={i} index={i} />
				))}
			</div>
		</div>
	);
};
