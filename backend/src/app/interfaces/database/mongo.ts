/**
 * @package interfaces.database
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define entity model of a Task
 * @requires mongoose, models
 */

import { model, connect, Model } from "mongoose";
import { imTask, imProject, TaskSchema, ProjectSchema } from "./models";

export default class MongoAdapter {
	private connectionStr: string;
	public TaskModel: Model<imTask>;
	public ProjectModel: Model<imProject>;

	constructor() {
		this.connectionStr = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
		this.TaskModel = model<imTask>("Task", TaskSchema);
		this.ProjectModel = model<imProject>("Project", ProjectSchema);
	}

	async connect(): Promise<void> {
		try {
			const options = {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				serverSelectionTimeoutMS: 5000,
			};
			console.log("Connecting to MongoDB", this.connectionStr);
			await connect(this.connectionStr, options);
		} catch (err) {
			throw new Error(`Connection Error: ${err}`);
		}
	}
}
