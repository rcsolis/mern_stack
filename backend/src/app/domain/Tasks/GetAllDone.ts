/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Get all task done
 * @requires entities.Tasks
 */
import { iTask } from "../../entities/Tasks";
import MongoAdapter from "../../interfaces/database/mongo";
export default class GetAllDoneTasks {
	private tasks: Array<iTask>;
	private database: MongoAdapter;
	constructor() {
		this.tasks = [];
		this.database = new MongoAdapter();
	}

	async exec() {
		//Get from database
		try {
			const data = await this.database.TaskModel.find({ done: true }).exec();
			data.forEach((el) => {
				if (el.done === true) this.tasks.push({
					_id: el._id ? el._id.toString() : el.toString(),
					projectId: el.projectId.toString(),
					name: el.name.trim(),
					created_at: el.created_at,
					updated_at: el.updated_at,
					deadline: el.deadline,
					done: el.done,
				});
			});
			return this.tasks;	
		} catch (err) {
			throw new Error(`Get all done task error, ${err}`);
		}
	}
}
