/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Mark task as done
 * @requires express, entities.iTask
 */
import MongoAdapter from "../../interfaces/database/mongo";

export default class UpdateTaskStatus {
	private id: string;
	private database: MongoAdapter;

	constructor(id: string) {
		this.id = id.trim();
		this.database = new MongoAdapter();
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
		} catch (err) {
			throw new Error(`Update task error, ${err}`);
		}
	}
}
