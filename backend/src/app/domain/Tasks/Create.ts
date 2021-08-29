/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Create new task
 * @requires entities.Tasks
 */

import { mockTasks } from "../../../mocks/Tasks";
import { iTask } from "../../entities/Tasks";
import { NewTask } from "./types";

export default class CreateTask {
	private task: iTask;
	private assigned: boolean;

	constructor() {
		this.task = {
			id: "",
			projectId: "",
			name: "",
			done: false,
			created_at: new Date(),
			deadline: new Date(),
			updated_at: new Date(),
		};
		this.assigned = false;
	}

	setData(task: NewTask) {
		if (!task.projectId || task.projectId === "")
			throw new Error("Missing project Id.");
		if (!task.name || task.name === "")
			throw new Error("Missing Task name.");
		if (!task.deadline) throw new Error("Missing Task deadline.");

		this.task.projectId = task.projectId.trim();
		this.task.name = task.name.trim();
		this.task.deadline = task.deadline || new Date();
		this.task.created_at = new Date();
		this.task.updated_at = new Date();
		this.task.done = task.done;
		this.assigned = true;
	}

	exec() {
		if (!this.assigned) throw new Error("New task data is not assigned");
		// Save to database
		const newId =
			parseInt(
				mockTasks[mockTasks.length - 1].id.substr(
					1,
					mockTasks[0].id.length
				)
			) + 111;
		this.task.id = "t" + newId.toString();
		mockTasks.push(this.task);
	}
}
