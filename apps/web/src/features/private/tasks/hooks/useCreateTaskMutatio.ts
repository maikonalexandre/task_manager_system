import type { CreateTaskProps } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { TasksService } from "../api";
import { getTasksQueryKey } from "../key";

export const useCreateTaskMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, Error, CreateTaskProps>({
		mutationFn: (task) => TasksService.create(task),

		onError: (e) => {
			if (axios.isAxiosError(e)) {
				return toast.error("Ouve uma falha ao criar uma task!", {
					description: e.response?.data?.message,
				});
			}

			console.error(e);
			toast.error("Ouve uma falha ao criar uma task!");
		},

		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: getTasksQueryKey.all,
			});
		},
	});
};
