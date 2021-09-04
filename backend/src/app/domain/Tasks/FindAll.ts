/**
 * @package app.domain.Tasks.FindAll
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define the use case for Get all tasks
 */
import Logger from "../../interfaces/logger";
import { iTask } from "../../entities/Tasks";
import MongoAdapter from "../../interfaces/database/mongo";

export default class FindAllTasks {
	private tasks: Array<iTask>;
	private database: MongoAdapter;
	constructor() {
		this.tasks = [];
		this.database = new MongoAdapter();
		this.database.connect();
	}

	async exec(): Promise<Array<iTask>> {
		// Get from database
		try {
			Logger.debug("Find query");
			const data = await this.database.TaskModel.find();
			Logger.debug("End Find query");
			// Parse to Entities
			data.forEach((row) => {
				this.tasks.push(row);
			});
			return this.tasks;
		} catch (err) {
			Logger.error(` Error executing FindAll ${err}`);
			throw new Error(`${err}`);
		} finally {
			this.database.close();
		}
	}
}
