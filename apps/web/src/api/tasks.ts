import { api } from "../config/api";

const getAll = async () => {
	const { data } = await api.get("/tasks");
	return data;
};

export const TasksService = {
	getAll,
};
