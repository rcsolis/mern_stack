/**
 * @package entities.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define entity model of a Task
 * @requires
 */
export interface iTask {
	_id?: string;
	projectId: string;
	name: string;
	done: boolean;
	deadline: Date;
	created_at?: Date;
	updated_at?: Date;
}
