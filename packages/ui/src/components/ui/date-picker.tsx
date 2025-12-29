import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label?: string;
	placeholder?: string;
	required: boolean;
}

export function DatePicker<T extends FieldValues>({
	label,
	control,
	name,
	required = false,
}: DatePickerProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				return (
					<FormItem>
						<FormLabel className="text-fuchsia-600">
							{label} {required && "*"}
						</FormLabel>
						<FormControl>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										data-empty={!field.value}
										className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
									>
										<CalendarIcon />
										{field.value ? (
											format(field.value, "dd MMM yyyy", { locale: ptBR })
										) : (
											<span>{label}</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										{...field}
										selected={field.value}
										onSelect={field.onChange}
									/>
								</PopoverContent>
							</Popover>
						</FormControl>
					</FormItem>
				);
			}}
		/>
	);
}
