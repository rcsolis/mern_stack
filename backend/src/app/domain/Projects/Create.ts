/**
 * @package domain.Projects
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Create a new project
 * @requires types
 */
import { mockProjects } from "../../../mocks/Projects";
import { iProject } from "../../entities/Project";
import { NewProject } from "./types";

export default class CreateProject {
	private project: iProject;
	private assigned: boolean;
	constructor() {
		this.assigned = false;
		this.project = {
			id: "",
			name: "",
			description: "",
			done: false,
			created_at: new Date(),
			updated_at: new Date(),
		};
	}

	setData(param: NewProject) {
		if (!param.name.trim() || param.name.trim() === "")
			throw new Error("Project name is required");
		if (!param.description.trim() || param.name.trim() === "")
			throw new Error("Project description is required");

		this.project.name = param.name.trim();
		this.project.description = param.description.trim();
		this.project.done = param.done;
		this.assigned = true;
	}

	exec() {
		if (!this.assigned) {
			throw new Error("New project data is not assigned");
		}
		// Save to database
		const newId =
			parseInt(
				mockProjects[mockProjects.length - 1].id.substr(
					1,
					mockProjects[0].id.length
				)
			) + 111;
		this.project.id = "p" + newId.toString();
		mockProjects.push(this.project);
	}
}
