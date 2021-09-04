/**
 * @package app.domain.Projects.GetDone
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Use case for get all done projects
 */
import MongoAdapter from "app/interfaces/database/mongo";
import Logger from "app/interfaces/logger";
import { iProject } from "../../entities/Project";
export default class GetDoneProjects {
	private projects: Array<iProject>;
	private database: MongoAdapter;

	constructor() {
		this.projects = [];
		this.database = new MongoAdapter();
		this.database.connect();
	}

	async exec() {
		try {
			const documents = await this.database.ProjectModel.find({
				done:true
			}).sort(-1).exec();
			documents.forEach((row) => {
				this.projects.push(row);
			});
			return this.projects;
		} catch (err) {
			Logger.error(` Error on get all done projects, ${err} `);
			throw new Error(` Error on get all done projects, ${err} `);
		} finally {
			this.database.close();
		}
	}
}
