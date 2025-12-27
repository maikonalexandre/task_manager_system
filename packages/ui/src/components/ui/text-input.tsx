import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./form";
import { Input } from "./input";

export const TextInput = ({
	control,
	name,
	label,
	placeholder,
	type = "text",
	className = "focus-visible:ring-fuchsia-600",
	required = false,
}) => {
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
							<Input
								className={className}
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
