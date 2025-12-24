import { Controller, Post, UseGuards } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { JwtVerifyGuard } from "src/common/jwt.guard";

@Controller("/")
export class AuthController {
	@Post("/tasks")
	@ApiOperation({ summary: "Create a new task" })
	@UseGuards(JwtVerifyGuard)
	registerUser() {
		return "Ok";
	}
}
