/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Create new task
 * @requires entities.Tasks
 */
import { iTask } from "../../entities/Tasks";
import MongoAdapter from "../../interfaces/database/mongo";
import { NewTask } from "./types";

export default class CreateTask {
	private assigned: boolean;
	private database: MongoAdapter;
	private task: iTask;

	constructor() {
		this.assigned = false;
		this.database = new MongoAdapter();
		this.task = {
			projectId: "",
			name: "",
			deadline: new Date(),
			created_at: new Date(),
			done: false,
		};
	}

	setData(param: NewTask) {
		if (!param.projectId || param.projectId === "")
			throw new Error("Missing project Id.");
		if (!param.name || param.name === "")
			throw new Error("Missing Task name.");
		if (!param.deadline) throw new Error("Missing Task deadline.");
		try {
			this.task.projectId = param.projectId;
			this.task.name = param.name.trim();
			this.task.deadline = param.deadline || new Date();
			this.assigned = true;		
		} catch (err) {
			console.error(err);
			throw new Error(`Cannot set data to new task ${err}`);
		}
	}

	async exec() {
		if (!this.assigned) throw new Error("New task data is not assigned");
		// Save to database
		try {
			const document = new this.database.TaskModel(this.task);
			await document.save();
		} catch (err) {
			throw new Error(`Create task error, ${err}`);
		}
	}
}
