/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Delete project by Id
 * @requires
 */
import MongoAdapter from "../../interfaces/database/mongo";

export default class DeleteTaskById {
	private id: string;
	private database: MongoAdapter;

	constructor(id: string) {
		this.id = id.trim();
		this.database = new MongoAdapter();
	}

	async exec() {
		if (!this.id || this.id === "")
			throw new Error("Task not found, missing ID.");

		//Delete in database
		try {
			const document = await this.database.TaskModel.findByIdAndRemove(
				this.id
			);
			if (!document) throw new Error("Task cannot be deleted.");
		} catch (err) {
			throw new Error(`Remove task error, ${err}`);
		}
	}
}
