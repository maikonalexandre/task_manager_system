import type { UpdateTaskProps } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { TasksService } from "../api";
import { getTasksQueryKey } from "../key";

interface useUpdateTaskMutationProps {
	task: UpdateTaskProps;
	id: string;
}

export const useUpdateTaskMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, Error, useUpdateTaskMutationProps>({
		mutationFn: ({ task, id }) => TasksService.update(task, id),

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
			console.log("Sendo chamado");
			queryClient.invalidateQueries({
				queryKey: getTasksQueryKey.all,
			});
		},
	});
};
