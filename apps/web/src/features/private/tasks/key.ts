export const getTasksQueryKey = {
	all: ["tasks"] as const,
	detail: ({ id }: { id: string }) => [...getTasksQueryKey.all, id],
};
