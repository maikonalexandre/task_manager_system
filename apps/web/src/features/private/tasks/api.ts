import type { CreateTaskProps, UpdateTaskProps } from "@repo/shared";
import { api } from "../../../config/api";

const getAll = async ({
	page = 1,
	size = 10,
}: {
	page?: number;
	size?: number;
}) => {
	const { data } = await api.get("/tasks", { params: { page, size } });
	return data;
};

const getById = async ({ id }: { id: string }) => {
	const { data } = await api.get(`/tasks/${id}`);
	return data;
};

const create = async (body: CreateTaskProps) => {
	return await api.post(`/tasks`, body);
};

const update = async (body: UpdateTaskProps, id: string) => {
	return await api.put(`/tasks/${id}`, body);
};

export const TasksService = {
	getAll,
	getById,
	create,
	update,
};
