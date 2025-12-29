import { HTMLInputTypeAttribute } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./form";
import { Input } from "./input";

interface TextInput<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label?: string;
	placeholder?: string;
	required: boolean;
	className?: string;
	type?: HTMLInputTypeAttribute;
}

export const TextInput = <T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	type = "text",
	className = "",
	required = false,
}: TextInput<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				return (
					<FormItem className={className}>
						<FormLabel className="text-fuchsia-600">
							{label} {required && "*"}
						</FormLabel>
						<FormControl>
							<Input
								className="focus-visible:ring-fuchsia-600"
								type={type}
								placeholder={placeholder}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};
