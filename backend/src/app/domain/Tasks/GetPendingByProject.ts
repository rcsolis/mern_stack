/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Get all pending tasks of a project
 * @requires entities.iTask
 */
import { mockTasks } from "../../../mocks/Tasks";
import { iTask } from "../../entities/Tasks";

export default class GetPendingTasksOfProject {
	private tasks: Array<iTask>;
	private id: string;
	constructor(id: string) {
		this.id = id.trim();
		this.tasks = [];
	}

	exec() {
		if (!this.id || this.id === "") throw new Error("Missing project id.");
		//Get from database
		const data: Array<iTask> = mockTasks;
		data.forEach((el) => {
			if (el.projectId === this.id && el.done === false)
				this.tasks.push(el);
		});
		return this.tasks;
	}
}
