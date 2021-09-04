/**
 * @package app.domain.Projects.DeleteById
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Use case for Delete project by Id
 */

import MongoAdapter from "../../interfaces/database/mongo";
import Logger from "../../interfaces/logger";

export default class DeleteProjectById {
	private id: string;
	private database: MongoAdapter;
	constructor(id: string) {
		this.id = id.trim();
		this.database = new MongoAdapter();
		this.database.connect();
	}

	async exec() {
		if (!this.id || this.id === "")
			throw new Error("Project not found, missing ID.");
		try {
			//Delete in database
			const document = await this.database.TaskModel.findByIdAndRemove(this.id);
			if (!document) throw new Error(`Project cannot be deleted. ${this.id}`);
			Logger.info(` Project deleted ${document}`);
		} catch (err) {
			Logger.error(` Error on delete project by id, ${err} `);
		} finally {
			this.database.close();
		}
	}
}
