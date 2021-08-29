/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define route handlers for tasks
 * @requires
 */
import { mockTasks } from "../../../mocks/Tasks";

export default class GetTaskById {
	private id: string;

	constructor(id: string) {
		this.id = id.trim();
	}

	exec() {
		if (!this.id || this.id === "") throw new Error("Missing task id.");
		// Get from database
		const res = mockTasks.find((el) => el.id === this.id);
		if (!res) throw new Error("Task not found");

		return res;
	}
}
