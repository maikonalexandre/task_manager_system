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
	className = "",
	required = false,
}) => {
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
