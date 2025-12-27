import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Form,
	TextInput,
} from "@repo/ui";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegisterMutation } from "./hooks/useRegisterMutation";

const FormSchema = z.object({
	username: z.string({ error: "Username obrigatório" }),
	email: z.email({ error: "Email obrigatório!" }),
	password: z
		.string({ message: "Senha obrigatória!" })
		.min(6, { message: "A senha precisa ter no minimo 6 digitos!" })
		.max(16, { message: "A senha precisa ter no maximo 6 digitos!" }),
});

export const RegisterPage = () => {
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const navigate = useNavigate();
	const { mutate } = useRegisterMutation();

	const onSubmit = async ({
		email,
		password,
		username,
	}: z.infer<typeof FormSchema>) => {
		mutate(
			{ email, password, username },
			{ onSuccess: () => navigate({ href: "/login" }) },
		);
	};

	return (
		<Card className="max-w-md min-w-[20rem] py-4">
			<CardHeader className="flex flex-col items-center space-y-2.5">
				<CardTitle className="text-3xl font-bold text-center">
					. Tasks
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
		</Card>
	);
};
