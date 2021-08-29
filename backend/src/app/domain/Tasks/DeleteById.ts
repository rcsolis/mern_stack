/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Delete project by Id
 * @requires
 */
import { mockTasks } from "../../../mocks/Tasks";

export default class DeleteTaskById {
	private id: string;

	constructor(id: string) {
		this.id = id.trim();
	}

	exec() {
		if (!this.id || this.id === "")
			throw new Error("Task not found, missing ID.");

		//Delete in database
		const res = mockTasks.findIndex((el) => el.id === this.id);
		if (!res) throw new Error("Task not found.");
		mockTasks.splice(res, 1);
	}
}
