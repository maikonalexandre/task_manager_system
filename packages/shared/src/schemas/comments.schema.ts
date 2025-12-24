import z from "zod";

export const createCommentSchema = z.object({
	taskId: z.uuidv4(),
	content: z.string().min(3),
	userId: z.uuidv4(),
});

export type CreateCommentProps = z.infer<typeof createCommentSchema>;
