/**
 * @package app.domain.Projects.FindAll
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Use case for get all projects
 */
import MongoAdapter from "app/interfaces/database/mongo";
import Logger from "app/interfaces/logger";
import { iProject } from "../../entities/Project";

export default class FindAllProjects {
	private projects: Array<iProject>;
	private database: MongoAdapter;
	constructor() {
		this.projects = [];
		this.database = new MongoAdapter();
		this.database.connect();
	}

	async exec() {
		//Get from database
		try {
			const data = await this.database.ProjectModel.find();
			data.forEach((row) =>
				this.projects.push(row)
			);
			return this.projects;
		} catch (err) {
			Logger.error(` Error on find all projects, ${err} `);
			throw new Error(`Error on find all projects, ${err}`);
		} finally {
			this.database.close();
		}
	}
}
