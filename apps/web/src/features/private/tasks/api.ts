import type { CreateTaskProps, UpdateTaskProps } from "@repo/shared";
import { api } from "../../../config/api";

const getAll = async () => {
	await new Promise((res, _) => setTimeout(res, 300));
	const { data } = await api.get("/tasks");
	return data;
};

const getById = async ({ id }: { id: string }) => {
	await new Promise((res, _) => setTimeout(res, 300));
	const { data } = await api.get(`/tasks/${id}`);
	return data;
};

const create = async (body: CreateTaskProps) => {
	await new Promise((res, _) => setTimeout(res, 300));
	return await api.post(`/tasks`, body);
};

const update = async (body: UpdateTaskProps, id: string) => {
	await new Promise((res, _) => setTimeout(res, 300));
	return await api.put(`/tasks/${id}`, body);
};

export const TasksService = {
	getAll,
	getById,
	create,
	update,
};
