import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Index({ unique: true })
	@Column()
	email!: string;

	@Index({ unique: true })
	@Column()
	username!: string;

	@Column()
	password!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
