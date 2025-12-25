import {
	BadRequestException,
	createParamDecorator,
	ExecutionContext,
} from "@nestjs/common";

export const UserId = createParamDecorator(
	(_: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const userId = request.headers["x-user-id"];

		if (!userId) {
			throw new BadRequestException("missing required header: 'x-user-id'");
		}

		return userId;
	},
);
