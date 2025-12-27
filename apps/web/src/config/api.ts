import axios, {
	AxiosError,
	HttpStatusCode,
	type InternalAxiosRequestConfig,
} from "axios";
import { router } from "../router";
import { useAuthStore } from "../store/use-auth-store";
import { env } from "./env";

export const api = axios.create({
	baseURL: env.VITE_API_URL,
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
	config.headers["Content-Type"] = "application/json";
	const { accessToken } = useAuthStore.getState();

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

let isRefreshing: boolean = false;
let failedRequestsQueue: {
	onSuccess: (accessToken: string) => void;
	onFailed: (error: AxiosError) => void;
}[] = [];

api.interceptors.response.use(
	async (res) => res,
	async (error: AxiosError) => {
		if (error.response?.status === HttpStatusCode.Unauthorized) {
			const currentErrorConfig = error.config;

			// We made a promise that we will call the request after refresh
			const retryRequest = new Promise((resolve, reject) => {
				failedRequestsQueue.push({
					onSuccess: () =>
						currentErrorConfig && resolve(api(currentErrorConfig)),
					onFailed: (error) => reject(error),
				});
			});

			if (!isRefreshing) {
				isRefreshing = true;
				const { refreshToken } = useAuthStore.getState();
				const requestHeaders = { headers: { "x-refresh-token": refreshToken } };

				try {
					const { data } = await api.post("/auth/refresh", {}, requestHeaders);

					useAuthStore.setState({
						isAuthenticated: true,
						accessToken: data.data.access_token,
						refreshToken: data.data.refresh_token,
						user: data.data.user,
					});

					failedRequestsQueue.forEach((req) => {
						req.onSuccess(data.access_token);
					});

					failedRequestsQueue = [];
					isRefreshing = false;
				} catch (_) {
					useAuthStore.getState().logout();
					router.navigate({ to: "/login" });

					failedRequestsQueue.forEach((request) => {
						request.onFailed(error);
					});

					failedRequestsQueue = [];
					isRefreshing = false;
				}
			}

			return retryRequest;
		}

		return Promise.reject(error);
	},
);
