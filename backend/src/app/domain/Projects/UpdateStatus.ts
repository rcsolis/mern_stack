/**
 * @package app.domain.Project.UpdateStatus
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Use case for update project status
 */
import MongoAdapter from "app/interfaces/database/mongo";
import Logger from "app/interfaces/logger";
export default class UpdateProjectStatus {
	private id: string;
	private database: MongoAdapter;

	constructor(id: string) {
		this.id = id.trim();
		this.database = new MongoAdapter();
		this.database.connect();
	}

	async exec() {
		if (!this.id || this.id === "")
			throw new Error("Update project by id Fail, missing id.");
		try {
			const document = await this.database.ProjectModel.findByIdAndUpdate(this.id, {
				$set: {
					done: true,
				}
			}, { upsert: true });
			if (!document)
				throw new Error(`Error on update project status ${this.id} ${document}`);
			Logger.info(`Project updated ${this.id} ${document}`);
		} catch (err) {
			Logger.error(` Error update project status failed, ${err}`);
			throw new Error(` Error update project status failed, ${err}`);
		} finally {
			this.database.close();
		}
	}
}
