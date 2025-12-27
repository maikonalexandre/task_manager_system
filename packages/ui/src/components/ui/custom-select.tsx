import { FormControl, FormField, FormItem, FormLabel } from "./form";
import {
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Select as ShadcnSelect,
} from "./select";

export function CustomSelect({
	label,
	control,
	name,
	placeholder = "Selecione uma opção",
	options,
	required = false,
}: {
	label: string;
	control: any;
	name: string;
	placeholder?: string;
	options: { label: string; value: string }[];
	required: boolean;
}) {
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
							<ShadcnSelect onValueChange={field.onChange} value={field.value}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder={placeholder} />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{options.map((item) => (
											<SelectItem key={item.value} value={item.value}>
												{item.label}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</ShadcnSelect>
						</FormControl>
					</FormItem>
				);
			}}
		/>
	);
}
