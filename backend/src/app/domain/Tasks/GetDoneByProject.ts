/**
 * @package app.domain.Tasks.GetDoneByProject
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define the use case for Get all done tasks of a project
 */
import Logger from "../../interfaces/logger";
import { iTask } from "../../entities/Tasks";
import MongoAdapter from "../../interfaces/database/mongo";
export default class GetDoneTasksOfProject {
	private tasks: Array<iTask>;
	private id: string;
	private database: MongoAdapter;

	constructor (id: string) {
		this.tasks = [];
		this.database = new MongoAdapter();
		this.database.connect();
		this.id = id.trim();
	}

	async exec () {
		if (!this.id || this.id === "") throw new Error("Missing project id.");
		//Get from database
		try {
			const data = await this.database.TaskModel.find({
				projectId: this.id,
				done: true,
			})
				.sort({ name: -1 })
				.exec();

			data.forEach((el) => {
				if (el.done === true) this.tasks.push(el);
			});
			return this.tasks;
		} catch (err) {
			Logger.error(` Error getting al done task by project ${err} `);
			throw new Error(`Get all done task error, ${err}`);
		} finally {
			this.database.close();
		}
	}
}
