import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentUser = createParamDecorator(
	(_, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return request.user;
	},
);

export const GetCurrentUserId = createParamDecorator(
	(_, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return request.user.sub;
	},
);
