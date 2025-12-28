import type { LoginData, UserLoginProps } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { AuthService } from "../api";

export const useLoginMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<LoginData, Error, UserLoginProps>({
		mutationFn: ({ email, password }) => AuthService.login({ email, password }),

		onError: (e) => {
			if (axios.isAxiosError(e)) {
				return toast.error("Ouve uma falha ao fazer login!", {
					description: e.response?.data?.message,
				});
			}

			console.error(e);
			toast.error("Ouve uma falha ao fazer login!");
		},

		onSuccess: () => {
			queryClient.clear();
		},
	});
};
