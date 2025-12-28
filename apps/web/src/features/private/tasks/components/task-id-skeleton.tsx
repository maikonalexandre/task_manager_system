import { Card, CardContent, CardTitle, Skeleton } from "@repo/ui";

export const TaskIdSkeleton = () => {
	return (
		<div className="px-4 animate-pulse">
			<Card className="px-4 border-l-2 border-l-zinc-200">
				<CardTitle className="mx-4">
					<Skeleton className="h-6 w-40" />
				</CardTitle>

				<CardContent>
					<div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
						{Array.from({ length: 5 }).map((_, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: Used only to static loading
							<div key={i} className="space-y-2">
								<Skeleton className="h-4 w-20" /> {/* Label */}
								<Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
							</div>
						))}

						<div className="col-span-full pt-8">
							<Skeleton className="h-10 w-sm rounded-md" />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
