/**
 * @package app.domain.Tasks.Update
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define the use case for Update task
 */
import Logger from "../../interfaces/logger";
import { iTask } from "../../entities/Tasks";
import MongoAdapter from "../../interfaces/database/mongo";
import { UpdateTask } from "./types";

export default class UpdateTaskById {
	private id: string;
	private assigned: boolean;
	private task: iTask;
	private database: MongoAdapter;

	constructor(id: string) {
		this.id = id.trim();
		this.task = {
			projectId: "",
			name: "",
			deadline: new Date(),
			updated_at: new Date(),
			created_at: new Date(),
			done: false,
		};
		this.database = new MongoAdapter();
		this.database.connect();
		this.assigned = false;
	}

	setData(ntask: UpdateTask) {
		if (!ntask.name.trim() || ntask.name.trim() === "")
			throw new Error("Task name is required");
		if (!ntask.projectId.trim() || ntask.projectId.trim() === "")
			throw new Error("Task project id is required");
		if (!ntask.deadline) throw new Error("Task deadline is required");

		this.task.name = ntask.name.trim();
		this.task.deadline = ntask.deadline;
		this.task.done = ntask.done;
		this.assigned = true;
	}

	async exec() {
		if (!this.assigned) {
			throw new Error("Updated data is not assigned");
		}
		// Save to database	
		try {
			const document = await this.database.TaskModel.findByIdAndUpdate(this.id, {
				$set: {
					name: this.task.name,
					deadline: this.task.deadline,
					done: this.task.done,
					updated_at: this.task.updated_at
				}
			}, { upsert: true });
			if (!document)
				throw new Error("Task cannot be updated.");
			Logger.info(` Task updated, ${document}`);
		} catch (err) {
			Logger.error(` Error on Updating a task ${err} `);
			throw new Error(`Update task error, ${err}`);
		} finally {
			this.database.close();
		}
	}
}
