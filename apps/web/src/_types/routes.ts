export interface RouterContext {
	auth: {
		isAuthenticated: boolean;
		user: {
			id: string;
			email: string;
			username: string;
		} | null;
	};
}
