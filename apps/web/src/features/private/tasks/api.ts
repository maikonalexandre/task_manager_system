import { api } from "../../../config/api";

const getAll = async () => {
	await new Promise((res, _) => setTimeout(res, 5000));
	const { data } = await api.get("/tasks");
	return data;
};

export const TasksService = {
	getAll,
};
