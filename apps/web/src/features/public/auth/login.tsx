import { zodResolver } from "@hookform/resolvers/zod";
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
import { z } from "zod";
import { useAuthStore } from "../../../store/use-auth-store";
import { useLoginMutation } from "./hooks/useLoginMutation";

const FormSchema = z.object({
	email: z.email({ error: "Email obrigatório!" }),
	password: z
		.string({ message: "Senha obrigatória!" })
		.min(6, { message: "A senha precisa ter no minimo 6 digitos!" })
		.max(16, { message: "A senha precisa ter no maximo 6 digitos!" }),
});

export const LoginPage = () => {
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const navigate = useNavigate();
	const { login } = useAuthStore();
	const { mutate } = useLoginMutation();

	const onSubmit = async ({ email, password }: z.infer<typeof FormSchema>) => {
		mutate(
			{ email, password },
			{
				onSuccess: ({ data }) => {
					login({
						accessToken: data.access_token,
						refreshToken: data.refresh_token,
						user: data.user,
					});

					navigate({ to: "/" });
				},
			},
		);
	};

	return (
		<Card className="max-w-md min-w-[20rem] py-4">
			<CardHeader className="flex flex-col items-center space-y-2.5">
				<CardTitle className="text-3xl font-bold text-center">
					. Tasks
				</CardTitle>
				<h2 className="font-semibold text-sm">Que bom ter voce por aqui :)</h2>
				<CardDescription className="text-center px-8">
					Preencha email e senha para aproveitar nossa aplicação!
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
							className="w-full font-semibold bg-sky-500 hover:bg-sky-600 cursor-pointer"
							type="submit"
						>
							Enviar
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter>
				<Link className="text-neutral-700 text-sm underline" to="/register">
					Cadastrar usuário
				</Link>
			</CardFooter>
		</Card>
	);
};
