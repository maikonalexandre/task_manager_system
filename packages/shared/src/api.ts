export interface ApiResponse<T> {
	success: boolean;
	data: T;
	timestamp: string;
}

export interface User {
	id: string;
	email: string;
	username: string;
}

export interface LoginData {
	user: User;
	accessToken: string;
	refreshToken: string;
}
