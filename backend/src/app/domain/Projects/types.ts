/**
 * @package domain.Projects
 * @version 1.0.1
 * @author Rafael Chavez
 * @description types fot projects domain
 * @requires
 */
export type NewProject = {
	id: string | null;
	name: string;
	description: string;
	done: boolean | false;
	created_at: Date | null;
};

export type UpdateProject = {
	id: string;
	name: string;
	description: string;
	done: boolean | false;
	updated_at: Date;
};
