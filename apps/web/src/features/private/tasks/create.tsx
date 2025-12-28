import { Card, CardContent, CardTitle } from "@repo/ui";
import { TasksForm } from "./components/form";

export const CreateNewTaskPage = () => {
	return (
		<div className="px-4">
			<Card>
				<CardTitle className="mx-4 text-zinc-700">
					Adicionar nova task
				</CardTitle>
				<CardContent>
					<TasksForm />
				</CardContent>
			</Card>
		</div>
	);
};
