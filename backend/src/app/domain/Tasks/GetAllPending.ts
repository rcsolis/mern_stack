/**
 * @package app.domain.Tasks.GetAllPending
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define the use case for Get all pending task
 */
import Logger from "app/interfaces/logger";
import { iTask } from "../../entities/Tasks";
import MongoAdapter from "../../interfaces/database/mongo";

export default class GetAllPendingTasks {
	private tasks: Array<iTask>;
	private database: MongoAdapter;
	constructor() {
		this.tasks = [];
		this.database = new MongoAdapter();
		this.database.connect();
	}

	async exec() {
		//Get from database
		try {
			const data = await this.database.TaskModel.find({
				done: false,
			}).exec();
			data.forEach((el) => {
				if (el.done === true) this.tasks.push(el);
			});
			return this.tasks;
		} catch (err) {
			Logger.error(` Error executing Getting all pending task. ${err} `);
			throw new Error(`Get all pending task error, ${err}`);
		} finally {
			this.database.close();
		}
	}
}
