import type { UserRegisterProps } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { AuthService } from "../api";

export const useRegisterMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, Error, UserRegisterProps>({
		mutationFn: ({ email, password, username }) =>
			AuthService.register({ email, password, username }),

		onError: (e) => {
			if (axios.isAxiosError(e)) {
				return toast.error("Houve uma falha ao registrar usuário!", {
					description: e.response?.data?.message,
				});
			}

			console.error(e);
			toast.error("Houve uma falha ao registrar usuário!");
		},

		onSuccess: async () => {
			queryClient.clear();
		},
	});
};
