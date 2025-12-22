import { User } from "../entities/user.entity";

export interface UserRepository {
	findByEmailOrUsername(value: string): Promise<User | null>;
	save(user: User): Promise<void>;
}
