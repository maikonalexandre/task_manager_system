import type { CreateCommentProps } from "@repo/shared";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { queryClient } from "../../../../config/react-query";
import { TasksService } from "../api";
import { getTasksQueryKey } from "../key";

export const useCreateCommentMutation = ({ id }: { id: string }) => {
	return useMutation<unknown, Error, CreateCommentProps>({
		mutationFn: (comment) => TasksService.createComment(comment, id),

		onError: (e) => {
			if (axios.isAxiosError(e)) {
				return toast.error("Houve uma falha ao adicionar comentário!", {
					description: e.response?.data?.message,
				});
			}

			console.error(e);
			toast.error("Houve uma falha ao adicionar comentário!");
		},

		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: getTasksQueryKey.comments({ id }),
				exact: false,
			});
		},
	});
};
