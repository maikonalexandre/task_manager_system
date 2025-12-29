import { zodResolver } from "@hookform/resolvers/zod";
import {
	type CreateTaskProps,
	createTaskSchema,
	type Task,
	taskPriorityOptions,
	taskStatusOptions,
} from "@repo/shared";
import {
	Button,
	CustomMultiSelect,
	CustomSelect,
	DatePicker,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Textarea,
	TextInput,
} from "@repo/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuthStore } from "../../../../store/use-auth-store";
import { getAllUsersConfig } from "../../../public/auth/query";
import { useCreateTaskMutation } from "../hooks/useCreateTaskMutatio";
import { useUpdateTaskMutation } from "../hooks/useUpdateTaskMutation";

export const TASK_FORM_ID = "@task_form_id";

interface TasksFormProps {
	task?: Task | null;
}

export const TasksForm = ({ task }: TasksFormProps) => {
	const {
		data: { users },
	} = useSuspenseQuery(getAllUsersConfig());
	const { user } = useAuthStore();

	const userOptions = users.map((user) => ({
		label: user.username,
		value: user.id,
	}));

	const form = useForm({
		resolver: zodResolver(createTaskSchema),
		defaultValues: {
			title: task?.title || "",
			description: task?.description || "",
			deadline: task?.deadline || addDays(new Date(), 1),
			priority: task?.priority || undefined,
			status: task?.status || undefined,
			assignedUserIds: task?.assignedUserIds || [user?.id] || undefined,
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
				id={TASK_FORM_ID}
				onSubmit={form.handleSubmit(onSubmit)}
				className="gap-4 grid grid-cols-1 sm:grid-cols-2"
			>
				<TextInput
					className="col-span-full"
					control={form.control}
					label="Titulo"
					placeholder="Titulo"
					name="title"
					required
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="col-span-full">
							<FormLabel className="text-fuchsia-500">Descrição *</FormLabel>
							<FormControl>
								<div className="relative">
									<Textarea
										{...field}
										placeholder="Adicione um comentário..."
										className="min-h-25 pr-12 resize-none focus-visible:ring-fuchsia-400 "
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
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

				<CustomMultiSelect
					control={form.control}
					name="assignedUserIds"
					options={userOptions}
					label="Responsáveis"
					searchPlaceholder="Procure por um responsável"
					placeholder="Selecione um responsável"
					required
				/>

				{!task && (
					<div className="col-span-full pt-8">
						<Button
							className="w-sm font-semibold bg-sky-500 hover:bg-sky-600"
							type="submit"
						>
							Salvar
						</Button>
					</div>
				)}
			</form>
		</Form>
	);
};
