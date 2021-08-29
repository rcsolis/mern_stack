/**
 * @package entities.Projects
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define entity model of a Project
 * @requires
 */

export interface iProject {
	id: string;
	name: string;
	description: string;
	done: boolean;
	created_at: Date;
	updated_at: Date | null;
}