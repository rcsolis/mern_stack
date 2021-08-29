/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Types for task
 * @requires
 */

export type NewTask = {
	projectId: string;
	name: string;
	done: boolean | false;
	deadline: Date;
	created_at: Date | null;
	updated_at: Date | null;
};

export type UpdateTask = {
	projectId: string;
	name: string;
	done: boolean | false;
	deadline: Date;
	updated_at: Date;
};
