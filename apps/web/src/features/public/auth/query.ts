import type { User } from "@repo/shared";
import { queryOptions } from "@tanstack/react-query";
import { AuthService } from "./api";
import { getUsersQueryKey } from "./key";

interface GetAllUsersResponse {
	users: User[];
	count: number;
}

export const getAllUsersConfig = () => {
	return queryOptions({
		queryKey: getUsersQueryKey.all,
		queryFn: (): Promise<GetAllUsersResponse> => AuthService.listUsers(),
	});
};
