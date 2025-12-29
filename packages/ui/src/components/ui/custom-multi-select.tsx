import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./form";
import { MultiSelect } from "./multi-select";

export const CustomMultiSelect = ({
	label,
	control,
	name,
	options,
	required = false,
	placeholder = "Selecione um item",
	searchPlaceholder = "Procurar um item",
}: {
	label: string;
	control: any;
	name: string;
	placeholder?: string;
	options: { label: string; value: string }[];
	required: boolean;
	searchPlaceholder: string;
}) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className="text-fuchsia-600">
						{label} {required && "*"}
					</FormLabel>
					<FormControl>
						<MultiSelect
							options={options}
							selected={field.value || []}
							onChange={field.onChange}
							placeholder={placeholder}
							searchPlaceholder={searchPlaceholder}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
