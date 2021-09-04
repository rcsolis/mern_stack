/**
 * @package app.domain.Tasks.DeleteById
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define the use case for create Delete project by Id
 * @requires
 */
import Logger from "app/interfaces/logger";
import MongoAdapter from "../../interfaces/database/mongo";

export default class DeleteTaskById {
	private id: string;
	private database: MongoAdapter;

	constructor(id: string) {
		this.id = id.trim();
		this.database = new MongoAdapter();
		this.database.connect();
	}

	async exec() {
		if (!this.id || this.id === "") throw new Error("Task not found, missing ID.");
		//Delete in database
		try {
			const document = await this.database.TaskModel.findByIdAndRemove(this.id);
			if (!document) throw new Error(` Task cannot be deleted. ${this.id} `);
			Logger.info(` Task deleted ${document}`);
		} catch (err) {
			Logger.error(` Error executing create new task. ${err} `);
			throw new Error(`Remove task error, ${err}`);
		} finally {
			this.database.close();
		}
	}
}
