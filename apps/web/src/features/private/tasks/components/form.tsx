import { zodResolver } from "@hookform/resolvers/zod";
import {
	type CreateTaskProps,
	createTaskSchema,
	type Task,
	taskPriorityOptions,
	taskStatusOptions,
} from "@repo/shared";
import { Button, CustomSelect, DatePicker, Form, TextInput } from "@repo/ui";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateTaskMutation } from "../hooks/useCreateTaskMutatio";
import { useUpdateTaskMutation } from "../hooks/useUpdateTaskMutation";

interface TasksFormProps {
	task?: Task | null;
}

export const TasksForm = ({ task }: TasksFormProps) => {
	const form = useForm({
		resolver: zodResolver(createTaskSchema),
		defaultValues: {
			title: task?.title || "",
			description: task?.description || "",
			deadline: task?.deadline || undefined,
			priority: task?.priority || undefined,
			status: task?.status || undefined,
		},
	});

	const updateTaskMutation = useUpdateTaskMutation();
	const createTaskMutation = useCreateTaskMutation();

	const onSubmit = (values: CreateTaskProps) => {
		if (task)
			return updateTaskMutation.mutate(
				{ id: task.id, task: values },
				{ onSuccess: () => toast.success("Task atulizada com sucesso!") },
			);

		createTaskMutation.mutate(values, {
			onSuccess: () => {
				toast.success("Task criada com sucesso!");
				form.reset();
			},
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="gap-4 grid grid-cols-1 sm:grid-cols-2"
			>
				<TextInput
					control={form.control}
					label="Titulo"
					placeholder="Titulo"
					name="title"
					required
				/>

				<TextInput
					control={form.control}
					label="Descrição"
					placeholder="Descrição"
					name="description"
					required
				/>

				<DatePicker
					label="Prazo"
					control={form.control}
					name="deadline"
					required={true}
				/>

				<CustomSelect
					name="priority"
					label="Prioridade"
					control={form.control}
					options={taskPriorityOptions}
					required
				/>

				<CustomSelect
					name="status"
					label="Status"
					control={form.control}
					options={taskStatusOptions}
					required
				/>

				<div className="col-span-full pt-8">
					<Button
						className="w-sm font-semibold bg-sky-500 hover:bg-sky-600"
						type="submit"
					>
						Salvar
					</Button>
				</div>
			</form>
		</Form>
	);
};
