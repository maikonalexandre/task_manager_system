import { zodResolver } from "@hookform/resolvers/zod";
import { type CreateCommentProps, createCommentSchema } from "@repo/shared";
import {
	Avatar,
	AvatarFallback,
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Textarea,
} from "@repo/ui";
import {
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Send } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getAllUsersConfig } from "../../../public/auth/query";
import { useCreateCommentMutation } from "../hooks/useCreateCommentMutation";
import { getTaskCommentsQueryConfig } from "../query";

interface TaskCommentsProps {
	taskId: string;
}

export const TaskComments = ({ taskId }: TaskCommentsProps) => {
	const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
		getTaskCommentsQueryConfig({ id: taskId }),
	);

	const {
		data: { users },
	} = useSuspenseQuery(getAllUsersConfig());

	const usersMap = useMemo(
		() => new Map(users.map((user) => [user.id, user])),
		[users],
	);

	const allComments = useMemo(() => {
		return data.pages.flatMap((page) =>
			page.comments.map((comment) => ({
				...comment,
				user: usersMap.get(comment.userId) || { username: "Usuário removido!" },
			})),
		);
	}, [data.pages, usersMap]);

	const form = useForm<CreateCommentProps>({
		resolver: zodResolver(createCommentSchema),
		defaultValues: { content: "" },
	});

	const { mutate, isPending } = useCreateCommentMutation({ id: taskId });

	const onSubmit = (values: CreateCommentProps) => {
		mutate(values, {
			onSuccess: () => {
				toast.success("Comentário adicionado!");
				form.reset();
			},
		});
	};

	return (
		<div className="space-y-6 mt-8">
			<div className="flex items-center gap-2 border-b pb-2">
				<h3 className="font-semibold text-sm text-zinc-700">Comentários</h3>
				<span className="text-xs bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full">
					{allComments.length}
				</span>
			</div>

			<div className="space-y-4">
				{allComments.map((comment) => (
					<div
						key={comment.id}
						className="flex gap-3 animate-in fade-in slide-in-from-bottom-2"
					>
						<Avatar className="h-6 w-6 border">
							<AvatarFallback className="text-[10px]">
								{comment.user?.username?.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="flex-1 space-y-1">
							<div className="flex items-baseline gap-2">
								<span className="text-xs font-semibold text-zinc-800">
									{comment.user?.username}
								</span>
								<span className="text-[10px] text-zinc-400">
									{formatDistanceToNow(new Date(comment.createdAt), {
										addSuffix: true,
										locale: ptBR,
									})}
								</span>
							</div>

							<span className="text-xs text-zinc-600 bg-zinc-50 inline-block  rounded-lg p-1 border border-zinc-100">
								{comment.content}
							</span>
						</div>
					</div>
				))}
			</div>

			{hasNextPage && (
				<Button
					onClick={() => fetchNextPage()}
					variant="ghost"
					className="cursor-pointer"
				>
					Var mais ...
				</Button>
			)}

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((data) => onSubmit(data))}
					className="relative mt-4"
				>
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div className="relative">
										<Textarea
											{...field}
											placeholder="Adicione um comentário..."
											className="min-h-25 pr-12 resize-none focus-visible:ring-fuchsia-400"
										/>
										<Button
											type="submit"
											size="icon"
											disabled={isPending}
											className="absolute bottom-2 right-2 h-8 w-8 bg-fuchsia-500 hover:bg-fuchsia-500"
										>
											<Send className="h-4 w-4" />
										</Button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	);
};
