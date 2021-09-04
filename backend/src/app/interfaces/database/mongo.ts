/**
 * @package app.interfaces.database.mongo
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define MongoDB Adapter
 */

import { iProject } from "app/entities/Project";
import { iTask } from "app/entities/Tasks";
import mongoose, { model, connect, Model } from "mongoose";
import { ProjectSchema, TaskSchema } from "./models";

export default class MongoAdapter {
	private connectionStr: string;
	public TaskModel: Model<iTask>;
	public ProjectModel: Model<iProject>;

	constructor () {
		this.connectionStr = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
		this.TaskModel = model<iTask>("Task", TaskSchema);
		this.ProjectModel = model<iProject>("Project", ProjectSchema);
	}

	async connect (): Promise<void> {
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

	async close (): Promise<void> {
		await mongoose.connection.close();
	}
}
