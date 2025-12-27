export interface ApiResponse<T> {
	success: boolean;
	data: T;
	timestamp: string;
}

export interface PaginationProps {
	current_page: number;
	item_count: number;
	items_per_page: number;
	total_items: number;
	total_pages: number;
}
