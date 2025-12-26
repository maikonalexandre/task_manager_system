import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/ui";
import { LoginForm } from "./form";

export const RegisterPage = () => {
	return (
		<Card className="max-w-md py-4">
			<CardHeader className="flex flex-col items-center space-y-2.5">
				<CardTitle className="text-brand-400 text-3xl font-semibold text-center">
					Task Login
				</CardTitle>
				<h2 className="text-brand-500 font-bold text-sm">
					Que bom ter voce por aqui :)
				</h2>
				<CardDescription className="text-center  px-8">
					Preencha email e senha para aproveitar nossa aplicação!
				</CardDescription>
			</CardHeader>
			<CardContent>
				<LoginForm />
			</CardContent>
		</Card>
	);
};
