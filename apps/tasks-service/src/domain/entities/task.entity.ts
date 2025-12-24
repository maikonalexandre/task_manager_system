export class Task {
	constructor(
		public readonly id: string,
		public title: string,
		public description: string,
		public deadline: Date,
		public priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT",
		public status: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE",
		public readonly createdAt?: Date,
		public readonly updatedAt?: Date,
	) {}
}
