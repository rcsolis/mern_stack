/**
 * @package domain.Projects
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Delete project by Id
 * @requires entities.Project,
 */
import { mockProjects } from "../../../mocks/Projects";

export default class DeleteProjectById {
	private id: string;

	constructor(id: string) {
		this.id = id.trim();
	}

	exec() {
		if (!this.id || this.id === "")
			throw new Error("Project not found, missing ID.");

		//Delete in database
		const res = mockProjects.findIndex((el) => el.id === this.id);
		if (!res) throw new Error("Project not found.");
		mockProjects.splice(res, 1);
	}
}
