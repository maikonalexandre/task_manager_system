import { CommandInput } from "cmdk";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Badge } from "./badge";
import { Command, CommandGroup, CommandItem, CommandList } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function MultiSelect({
	options,
	selected,
	onChange,
	placeholder = "Select",
	searchPlaceholder = "Find",
}: {
	options: { label: string; value: string }[];
	selected: string[];
	onChange: (value: string[]) => void;
	placeholder?: string;
	searchPlaceholder?: string;
}) {
	const [open, setOpen] = React.useState(false);

	const handleUnselect = (item: string) => {
		onChange(selected.filter((i) => i !== item));
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<div className="flex min-h-10 w-full flex-wrap gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer">
					{selected.length > 0 ? (
						selected.map((item) => (
							<Badge key={item} variant="secondary" className="mr-1">
								{options.find((o) => o.value === item)?.label}
								<button
									type="button"
									className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring"
									onKeyDown={(e) => {
										if (e.key === "Enter") handleUnselect(item);
									}}
									onMouseDown={(e) => {
										e.preventDefault();
										e.stopPropagation();
									}}
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										handleUnselect(item);
									}}
								>
									<X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
								</button>
							</Badge>
						))
					) : (
						<span className="text-muted-foreground">{placeholder}</span>
					)}
				</div>
			</PopoverTrigger>
			<PopoverContent
				className="w-(--radix-popover-trigger-width p-0"
				align="start"
			>
				<Command>
					<CommandInput
						placeholder={searchPlaceholder}
						className="h-9 p-2 border-b w-full outline-none"
					/>
					<CommandList>
						<CommandGroup className="max-h-64 overflow-auto">
							{options.map((option) => (
								<CommandItem
									key={option.value}
									onSelect={() => {
										onChange(
											selected.includes(option.value)
												? selected.filter((s) => s !== option.value)
												: [...selected, option.value],
										);
									}}
								>
									<div
										className={cn(
											"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
											selected.includes(option.value)
												? "bg-primary text-primary-foreground"
												: "opacity-50",
										)}
									>
										{selected.includes(option.value) && "✓"}
									</div>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
