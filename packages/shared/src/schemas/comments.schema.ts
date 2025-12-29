import z from "zod";
import { taskSchema } from "./tasks.schema";

export const createCommentSchema = z.object({
	content: z.string().min(3),
});

export const commentSchema = createCommentSchema.extend({
	id: z.uuidv4(),
	createdAt: z.date(),
	updatedAt: z.date(),
	taskId: z.uuidv4(),
	userId: z.uuidv4(),
});

export type CreateCommentProps = z.infer<typeof createCommentSchema>;
export type CommentProps = z.infer<typeof commentSchema>;

export const createCommentEventSchema = z.object({
	taskId: z.uuid(),
	content: z.string(),
	task: taskSchema,
});

export type CreateCommentEventPayload = z.infer<
	typeof createCommentEventSchema
>;
