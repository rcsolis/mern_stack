/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Update task data
 * @requires types
 */
import { mockTasks } from "../../../mocks/Tasks";
import { iTask } from "../../entities/Tasks";
import { UpdateTask } from "./types";

export default class UpdateTaskById {
	private id: string;
	private assigned: boolean;
	private task: iTask;

	constructor(id: string) {
		this.id = id.trim();
		this.task = {
			id: "",
			projectId: "",
			name: "",
			deadline: new Date(),
			updated_at: new Date(),
			created_at: new Date(),
			done: false,
		};
		this.assigned = false;
	}

	setData(ntask: UpdateTask) {
		if (!ntask.name.trim() || ntask.name.trim() === "")
			throw new Error("Task name is required");
		if (!ntask.projectId.trim() || ntask.projectId.trim() === "")
			throw new Error("Task project id is required");
		if (!ntask.deadline) throw new Error("Task deadline is required");

		this.task.name = ntask.name.trim();
		this.task.projectId = ntask.projectId.trim();
		this.task.deadline = ntask.deadline;
		this.task.done = ntask.done;
		this.assigned = true;
	}

	exec() {
		if (!this.assigned) {
			throw new Error("Updated data is not assigned");
		}
		// Save to database
		const resIdx = mockTasks.findIndex((el) => el.id === this.id);

		if (resIdx === -1) throw new Error("Project not found.");
		const res = mockTasks[resIdx];
		this.task.id = res.id;
		this.task.created_at = res.created_at;
		mockTasks.splice(resIdx, 1, this.task);
	}
}
