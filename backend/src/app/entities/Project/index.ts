/**
 * @package entities.Projects
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define entity model of a Project
 */

export interface iProject {
	name: string;
	description: string;
	done: boolean;
	created_at?: Date;
	updated_at?: Date;
}