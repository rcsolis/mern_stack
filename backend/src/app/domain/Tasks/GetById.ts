import { iTask } from "../../entities/Tasks";
import MongoAdapter from "../../interfaces/database/mongo";

/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define route handlers for tasks
 * @requires
 */
export default class GetTaskById {
	private id: string;
	private database: MongoAdapter;

	constructor(id: string) {
		this.id = id.trim();
		this.database = new MongoAdapter();
	}

	async exec() {
		if (!this.id || this.id === "") throw new Error("Missing task id.");
		// Get from database
		try {
			const data = await this.database.TaskModel.findById(this.id);
			if (!data) throw new Error("Task not found.");
			const task: iTask = {
				_id: data._id ? data._id.toString() : data.toString(),
				projectId: data.projectId.toString(),
				name: data.name.trim(),
				created_at: data.created_at,
				updated_at: data.updated_at,
				deadline: data.deadline,
				done: data.done,
			};
			return task;
		} catch (err) {
			throw new Error(`Get task error, ${err}`);
		}
	}
}
