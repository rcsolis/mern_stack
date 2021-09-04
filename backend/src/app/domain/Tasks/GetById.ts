/**
 * @package app.domain.Tasks.GetById
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define use case for get task by id
 */
import Logger from "../../interfaces/logger";
import MongoAdapter from "../../interfaces/database/mongo";
export default class GetTaskById {
	private id: string;
	private database: MongoAdapter;

	constructor(id: string) {
		this.id = id.trim();
		this.database = new MongoAdapter();
		this.database.connect();
	}

	async exec() {
		if (!this.id || this.id === "") throw new Error("Missing task id.");
		// Get from database
		try {
			const data = await this.database.TaskModel.findById(this.id);
			if (!data) throw new Error("Task not found.");
			return data;
		} catch (err) {
			Logger.error(` Error executing Get task by id. ${err} `);
			throw new Error(`Get task error, ${err}`);
		} finally {
			this.database.close();
		}
	}
}
