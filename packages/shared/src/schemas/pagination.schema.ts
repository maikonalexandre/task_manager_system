import z from "zod";

export const paginationQuerySchema = z.object({
	page: z.coerce.number().min(1).optional().default(1),
	size: z.coerce.number().min(1).max(100).optional().default(10),
});

export type PaginationQueryProps = z.infer<typeof paginationQuerySchema>;
