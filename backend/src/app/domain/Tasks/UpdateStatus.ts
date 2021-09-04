/**
 * @package app.domain.Tasks.UpdateStatus
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Use case for Mark task as done
 */
import Logger from "../../interfaces/logger";
import MongoAdapter from "../../interfaces/database/mongo";

export default class UpdateTaskStatus {
	private id: string;
	private database: MongoAdapter;

	constructor(id: string) {
		this.id = id.trim();
		this.database = new MongoAdapter();
		this.database.connect();
	}

	async exec() {
		if (!this.id || this.id === "") throw new Error("Task id is missing");
		//Update database
		try {
			const document = await this.database.TaskModel.findByIdAndUpdate(
				this.id,
				{
					$set: {
						done: true,
					},
				},
				{ upsert: true }
			);
			if (!document) throw new Error("Task cannot be updated.");
			Logger.info(` Task status updated, ${document}`);
		} catch (err) {
			Logger.error(` Error on update task status ${err} `);
			throw new Error(`Update task error, ${err}`);
		} finally {
			this.database.close();
		}
	}
}
