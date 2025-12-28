import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
	cn,
	Skeleton,
} from "@repo/ui";

export const TaskCardSkeleton = ({ index = 0 }: { index?: number }) => {
	const heights = ["h-6", "h-16", "h-22"];
	const descriptionHeight = heights[index % heights.length];

	const titleWidths = ["w-1/2", "w-1/3", "w-2/3"];
	const titleWidth = titleWidths[index % titleWidths.length];

	return (
		<Card className="px-4 border-l-2 border-l-zinc-200 mb-4 break-inside-avoid">
			<CardTitle className="flex items-center gap-2">
				<Skeleton className="h-6 w-20 rounded-full" />
				<Skeleton className={cn("h-5", titleWidth)} />
			</CardTitle>

			<CardDescription className="space-y-2">
				<Skeleton className={cn("w-full", descriptionHeight)} />
				{index % 2 === 0 && <Skeleton className="h-4 w-[80%]" />}
			</CardDescription>

			<CardContent className="px-0">
				<Skeleton className="h-4 w-24" />
			</CardContent>
		</Card>
	);
};
