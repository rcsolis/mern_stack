/**
 * @package domain.Projects
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Update project data
 * @requires types
 */

import { mockProjects } from "../../../mocks/Projects";
import { iProject } from "../../entities/Project";
import { UpdateProject } from "./types";

export default class UpdateProjectById {
	private id: string;
	private assigned: boolean;
	private project: iProject;

	constructor(id: string) {
		this.id = id.trim();
		this.project = {
			id: "",
			name: "",
			description: "",
			updated_at: new Date(),
			created_at: new Date(),
			done: false,
		};
		this.assigned = false;
	}

	setData(nproject: UpdateProject) {
		if (!nproject.name.trim() || nproject.name.trim() === "")
			throw new Error("Project name is required");
		if (!nproject.description.trim() || nproject.name.trim() === "")
			throw new Error("Project description is required");

		this.project.name = nproject.name.trim();
		this.project.description = nproject.description.trim();
		this.project.done = nproject.done;
		this.assigned = true;
	}

	exec() {
		if (!this.assigned) {
			throw new Error("Updated data is not assigned");
		}
		// Save to database
		const resIdx = mockProjects.findIndex((el) => el.id === this.id);
		if (resIdx === -1) throw new Error("Project not found.");
		const res = mockProjects[resIdx];
		this.project.id = res.id;
		this.project.created_at = res.created_at;
		mockProjects.splice(resIdx, 1, this.project);
	}
}
