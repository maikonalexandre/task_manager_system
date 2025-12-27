export function mapEnumToOptions<T extends string>(enumObj: Record<string, T>) {
	return Object.values(enumObj).map((value) => ({
		label: value.charAt(0) + value.slice(1).toLowerCase().replace(/_/g, " "),
		value: value as T,
	}));
}
