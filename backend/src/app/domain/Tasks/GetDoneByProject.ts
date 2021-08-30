/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Get all done tasks of a project
 * @requires entities.iTask, interfaces.database.MongoAdapder, mongoose
 */
import mongoose from "mongoose";
import { iTask } from "../../entities/Tasks";
import MongoAdapter from "../../interfaces/database/mongo";
export default class GetDoneTasksOfProject {
	private tasks: Array<iTask>;
	private id: string;
	private database: MongoAdapter;
	constructor(id: string) {
		this.tasks = [];
		this.database = new MongoAdapter();
		this.id = id.trim();
	}

	async exec() {
		if (!this.id || this.id === "") throw new Error("Missing project id.");
		//Get from database
		try {
			const data = await this.database.TaskModel.find({
				projectId: new mongoose.Schema.Types.ObjectId(this.id),
				done: true,
			})
				.sort({ name: -1 })
				.exec();
			data.forEach((el) => {
				if (el.done === true)
					this.tasks.push({
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
