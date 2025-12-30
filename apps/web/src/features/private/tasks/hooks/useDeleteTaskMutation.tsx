import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { TasksService } from "../api";
import { getTasksQueryKey } from "../key";

export const useDeleteTaskMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id }: { id: string }) => TasksService.deleteTask({ id }),

		onError: (e) => {
			if (axios.isAxiosError(e)) {
				return toast.error("Houve uma falha ao deletar task!", {
					description: e.response?.data?.message,
				});
			}

			console.error(e);
			toast.error("Houve uma falha ao deletar task!");
		},

		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: getTasksQueryKey.all,
			});
		},
	});
};
