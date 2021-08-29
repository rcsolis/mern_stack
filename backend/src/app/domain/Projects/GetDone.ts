/**
 * @package domain.Projects
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Get all tasks
 * @requires entities.Project,
 */
import { mockProjects } from "../../../mocks/Projects";
import { iProject } from "../../entities/Project";

export default class GetDoneProjects {
	private projects: Array<iProject>;
	constructor() {
		this.projects = [];
	}

	exec() {
		//Get from database
		const data: Array<iProject> = mockProjects;

		data.forEach((el) => {
			if (el.done === true) this.projects.push(el);
		});

		return this.projects;
	}
}
