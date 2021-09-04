/**
 * @package app.interfaces.database.mongo
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define MongoDB Adapter
 */

import { iProject } from "../../entities/Project";
import { iTask } from "../../entities/Tasks";
import mongoose, { model, Model } from "mongoose";
import Logger from "../logger";
import { ProjectSchema, TaskSchema } from "./models";

export default class MongoAdapter {
	private connectionStr: string;
	public TaskModel: Model<iTask>;
	public ProjectModel: Model<iProject>;

	constructor() {
		this.connectionStr = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
		this.TaskModel = model<iTask>("Task", TaskSchema);
		this.ProjectModel = model<iProject>("Project", ProjectSchema);
	}

	async connect(): Promise<void> {
		try {
			const options = {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true,
				serverSelectionTimeoutMS: 5000,
			};
			Logger.info("Connecting to MongoDB", this.connectionStr);
			await mongoose.connect(this.connectionStr, options);

			//Logger.info("Connecting to MongoDB", this.connectionStr);
			//await mongoose.connect(this.connectionStr);
		} catch (err) {
			Logger.error(` Error occurs when connecting to MongoDB ${err}`);
			throw new Error(`Connection Error: ${err}`);
		}
	}

	async close(): Promise<void> {
		await mongoose.connection.close();
	}
}
