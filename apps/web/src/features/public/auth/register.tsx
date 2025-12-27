import { zodResolver } from "@hookform/resolvers/zod";
import { type UserRegisterProps, userRegisterSchema } from "@repo/shared";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Form,
	TextInput,
} from "@repo/ui";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "./hooks/useRegisterMutation";

export const RegisterPage = () => {
	const form = useForm({
		resolver: zodResolver(userRegisterSchema),
		defaultValues: {
			email: "",
			password: "",
			username: "",
		},
	});

	const navigate = useNavigate();
	const { mutate } = useRegisterMutation();

	const onSubmit = async ({ email, password, username }: UserRegisterProps) => {
		mutate(
			{ email, password, username },
			{ onSuccess: () => navigate({ href: "/login" }) },
		);
	};

	return (
		<Card className="max-w-md min-w-[20rem] py-4">
			<CardHeader className="flex flex-col items-center space-y-2.5">
				<CardTitle className="text-3xl font-bold text-center text-fuchsia-600">
					Tasks
				</CardTitle>
				<h2 className="font-semibold text-sm">Seja bem vindo :)</h2>
				<CardDescription className="text-center  px-8">
					Preencha os campos abaixo para realizar o seu cadastro na aplicação!
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<TextInput
							control={form.control}
							name="username"
							placeholder="Username"
							label="Username"
							required={true}
						/>

						<TextInput
							control={form.control}
							name="email"
							placeholder="Email"
							label="Email"
							required={true}
						/>
						<TextInput
							type="password"
							control={form.control}
							name="password"
							placeholder="Senha"
							label="Senha"
							required={true}
						/>

						<Button
							className="w-full font-semibold bg-sky-500 hover:bg-sky-600"
							type="submit"
						>
							Enviar
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter>
				<Link className="text-neutral-700 text-sm underline" to="/login">
					Login
				</Link>
			</CardFooter>
		</Card>
	);
};
