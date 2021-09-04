/**
 * @package app.domain.Projects.GetById
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Use case for Get all projects
 */
import MongoAdapter from "../../interfaces/database/mongo";
import Logger from "../../interfaces/logger";

export default class GetProjectById {
	private id: string;
	private database: MongoAdapter;

	constructor(id: string) {
		this.id = id.trim();
		this.database = new MongoAdapter();
		this.database.connect();
	}

	async exec() {
		if (!this.id || this.id === "") {
			throw new Error("Error, get project by id, missing id.");
		}
		try {
			const document = await this.database.ProjectModel.findById(this.id);
			if (!document)
				throw new Error(`Project not found ${this.id}`);
			return document;
		} catch (err) {
			Logger.error(`Error on find document by id, ${err}`);
			throw new Error(`Error on find document by id, ${err}`);
		} finally {
			this.database.close();
		}
	}
}
