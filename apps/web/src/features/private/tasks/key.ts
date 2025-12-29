export const getTasksQueryKey = {
	all: ["tasks"] as const,
	detail: ({ id }: { id: string }) => [...getTasksQueryKey.all, id] as const,
	comments: ({ id }: { id: string }) =>
		[...getTasksQueryKey.all, id, "comments"] as const,
};
