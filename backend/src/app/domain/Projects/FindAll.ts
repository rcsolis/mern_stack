/**
 * @package domain.Projects
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Get all tasks
 * @requires entities.Project,
 */
import { mockProjects } from "../../../mocks/Projects";
import { iProject } from "../../entities/Project";

export default class FindAllProjects {
	private projects: Array<iProject>;

	constructor() {
		this.projects = [];
	}

	exec() {
		//Get from database
		const data = mockProjects;
		data.forEach((row) =>
			this.projects.push({
				id: row.id,
				name: row.name,
				description: row.description,
				created_at: row.created_at,
				updated_at: row.updated_at,
				done: row.done,
			})
		);
		return this.projects;
	}
}
