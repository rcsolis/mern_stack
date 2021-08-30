/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Get all tasks
 * @requires entities.Tasks
 */
import { iTask } from "../../entities/Tasks";
import MongoAdapter from "../../interfaces/database/mongo";

export default class FindAllTasks {
	private tasks: Array<iTask>;

	constructor() {
		this.tasks = [];
	}

	async exec(): Promise<Array<iTask>> {
		// Get from database
		try {
			const db = new MongoAdapter();
			const data = await db.TaskModel.find();
			// Parse to Entities
			data.forEach((row) => {
				this.tasks.push({
					projectId: row.projectId.toString(),
					_id: row._id?row._id.toString():row.toString(),
					name: row.name,
					done: row.done,
					updated_at: row.updated_at,
					created_at: row.created_at,
					deadline: row.deadline,
				});
			});
			return this.tasks;
		} catch (err) {
			throw new Error("");
		}
	}
}
