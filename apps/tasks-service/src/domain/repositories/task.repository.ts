import { Task } from "../entities/task.entity";

export interface TasksRepository {
	save(task: Task): Promise<void>;
}
