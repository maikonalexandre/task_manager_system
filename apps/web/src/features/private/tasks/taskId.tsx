import { zodResolver } from "@hookform/resolvers/zod";
import {
	type CreateTaskProps,
	createTaskSchema,
	taskPriorityOptions,
	taskStatusOptions,
} from "@repo/shared";
import {
	Card,
	CardContent,
	CardTitle,
	CustomSelect,
	DatePicker,
	Form,
	TextInput,
} from "@repo/ui";

import { useForm } from "react-hook-form";

export const TaskDetailsPage = () => {
	const form = useForm({
		resolver: zodResolver(createTaskSchema),
		defaultValues: {
			title: undefined,
			description: undefined,
			deadline: undefined,
			priority: undefined,
			status: undefined,
		},
	});

	const onSubmit = (data: CreateTaskProps) => {
		console.log(data);
	};

	return (
		<div className="px-4">
			<Card>
				<CardTitle className="mx-4 text-zinc-700">Detalhes da task</CardTitle>
				<CardContent>
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
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};
