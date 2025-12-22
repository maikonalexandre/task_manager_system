export class User {
	constructor(
		public readonly email: string,
		public readonly username: string,
		public readonly password: string,
		public readonly id: string,
		public readonly createdAt?: Date,
		public readonly updatedAt?: Date,
	) {}
}
