/**
 * @package domain.Tasks.types
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Types for task operations
 */

export type NewTask = {
	projectId: string;
	name: string;
	done: boolean | false;
	deadline: Date;
	created_at?: Date;
	updated_at?: Date;
};

export type UpdateTask = {
	projectId: string;
	name: string;
	done: boolean | false;
	deadline: Date;
	updated_at: Date;
};
