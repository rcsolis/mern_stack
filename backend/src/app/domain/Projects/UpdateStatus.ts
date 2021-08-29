/**
 * @package domain.Project
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Update project set it as done
 * @requires express, entities.iProject
 */
import { mockProjects } from "../../../mocks/Projects";
import { iProject } from "../../entities/Project";

export default class UpdateProjectStatus {
	private id: string;
	constructor(id: string) {
		this.id = id.trim();
	}

	exec() {
		if (!this.id || this.id === "") {
			throw new Error("Project not found, missing ID.");
		}
		//Update database
		const res = mockProjects.findIndex((el) => el.id === this.id);
		if (!res) throw new Error("Project not found.");

		const updated: iProject = mockProjects[res];
		updated.done = true;
		mockProjects.splice(res, 1, updated);
	}
}
