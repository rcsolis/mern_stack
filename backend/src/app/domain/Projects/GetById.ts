/**
 * @package domain.Projects
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Get all tasks
 * @requires entities.Project,
 */
import { mockProjects } from "../../../mocks/Projects";
import { iProject } from "../../entities/Project";

export default class GetProjectById {
	private id: string;

	constructor(id: string) {
		this.id = id.trim();
	}

	exec(): iProject | null {
		if (!this.id) return null;

		// Get from database
		const data: iProject | undefined = mockProjects.find(
			(el) => el.id === this.id
		);
		if (!data) return null;

		return data;
	}
}
