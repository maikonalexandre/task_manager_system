import type { TaskPriority, TaskStatus, User } from "@repo/shared";
import {
	Badge,
	Card,
	CardContent,
	CardDescription,
	CardTitle,
	cn,
} from "@repo/ui";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const TASK_PRIORITY_BORDER_COLOR_MAP: Record<TaskPriority, string> = {
	HIGH: "border-l-orange-500",
	LOW: "border-l-zinc-400",
	MEDIUM: "border-l-yellow-500",
	URGENT: "border-l-red-500",
};

export const TASK_STATUS_ICONS: Record<
	TaskStatus,
	{ icon: string; bgColor: string }
> = {
	TODO: { icon: "○", bgColor: "bg-zinc-200" },
	IN_PROGRESS: { icon: "◐", bgColor: "bg-yellow-400" },
	REVIEW: { icon: "⊖", bgColor: "bg-red-400" },
	DONE: { icon: "●", bgColor: "bg-green-400" },
};

interface TaskCardProps {
	priority: TaskPriority;
	description: string;
	status: TaskStatus;
	title: string;
	assignedUserIds?: User[];
	deadline: Date;
}

export const TaskCard = ({
	deadline,
	description,
	title,
	status,
	priority,
}: TaskCardProps) => {
	return (
		<Card
			className={cn(
				"px-4 border-l-2 border-l-red-500",
				TASK_PRIORITY_BORDER_COLOR_MAP[priority],
				status === "DONE" && "opacity-50",
			)}
		>
			<CardTitle className="text-zinc-700 flex items-center gap-2">
				<Badge
					variant="secondary"
					className={cn(TASK_STATUS_ICONS[status].bgColor)}
				>
					{TASK_STATUS_ICONS[status].icon} {status}
				</Badge>
				<p className="text-zinc-700 font-medium line-clamp-2">
					{title.toUpperCase()}
				</p>
			</CardTitle>
			<CardDescription className="line-clamp-3">{description}</CardDescription>
			<CardContent className="px-0">
				<span className="text-sm">
					{status === "DONE" && "concluído"}
					{status !== "DONE" &&
						formatDistanceToNow(new Date(deadline), {
							addSuffix: true,
							locale: ptBR,
						})}
				</span>
			</CardContent>
		</Card>
	);
};
