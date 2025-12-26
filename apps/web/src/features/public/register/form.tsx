import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, TextInput } from "@repo/ui";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useAuth } from "../../hooks/auth";
// import { LoginService } from "../../services/auth";

const FormSchema = z.object({
	email: z.email({ error: "Email obrigatório!" }),
	senha: z
		.string({ message: "Senha obrigatória!" })
		.min(6, { message: "A senha precisa ter no minimo 6 digitos!" })
		.max(16, { message: "A senha precisa ter no maximo 6 digitos!" }),
});

export const LoginForm = () => {
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			senha: "",
		},
	});

	// const navigate = useNavigate();
	// const { login } = useAuth();

	// const { mutateAsync: LoginMutation } = useMutation({
	// 	mutationFn: LoginService.login,
	// 	onSuccess: ({ token, usuario: user }) => {
	// 		if (user.tipo === "prestador") {
	// 			login(token, user);
	// 			return navigate("/");
	// 		}

	// 		toast.error(t("login.common.form.toast.login.permission.error.message"), {
	// 			description: t(
	// 				"login.common.form.toast.login.permission.error.description",
	// 			),
	// 		});
	// 	},
	// 	onError: (error) =>
	// 		toast.error(t("login.common.form.toast.login.unexpected.error.message"), {
	// 			description: t(
	// 				"login.common.form.toast.login.unexpected.error.description",
	// 			),
	// 		}),
	// });

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(() => {})} className="space-y-4">
				<TextInput
					control={form.control}
					name="email"
					placeholder="Email"
					label="Email"
					required={true}
				/>
				<TextInput
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
	);
};
