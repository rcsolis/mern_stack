/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Mark task as done
 * @requires express, entities.iTask
 */
import { mockTasks } from "../../../mocks/Tasks";
import { iTask } from "../../entities/Tasks";

export default class UpdateTaskStatus {
	private id: string;

	constructor(id: string) {
		this.id = id.trim();
	}

	exec() {
		if (!this.id || this.id === "") throw new Error("Task id is missing");
		//Update database
		const res = mockTasks.findIndex((el) => el.id === this.id);
		if (!res) throw new Error("Task not found.");

		const updated: iTask = mockTasks[res];
		updated.done = true;
		mockTasks.splice(res, 1, updated);
	}
}
