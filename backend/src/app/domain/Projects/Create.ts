/**
 * @package app.domain.Projects.Create
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Use case for Create a new project
 */
import MongoAdapter from "../../interfaces/database/mongo";
import Logger from "../../interfaces/logger";
import { iProject } from "../../entities/Project";
import { NewProject } from "./types";

export default class CreateProject {
	private project: iProject;
	private assigned: boolean;
	private database: MongoAdapter;
	constructor() {
		this.assigned = false;
		this.project = {
			name: "",
			description: "",
			done: false,
			created_at: new Date(),
			updated_at: new Date(),
		};
		this.database = new MongoAdapter();
		this.database.connect();
	}

	setData(param: NewProject) {
		if (!param.name.trim() || param.name.trim() === "")
			throw new Error("Project name is required");
		if (!param.description.trim() || param.name.trim() === "")
			throw new Error("Project description is required");
		try {
			this.project.name = param.name.trim();
			this.project.description = param.description.trim();
			this.project.done = param.done;
			this.assigned = true;
		} catch (err) {
			Logger.error(` Error on set data for create project: ${err} `);
			throw new Error(` Set project data error, ${err} `);
		}
	}

	async exec() {
		if (!this.assigned) {
			throw new Error("New project data is not assigned");
		}
		try {
			// Save to database
			const document = new this.database.ProjectModel(this.project);
			await document.save();
			Logger.info(` New project created ${document} `);
		} catch (err) {
			Logger.error(` Error executing create new project. ${err} `);
			throw new Error(` Create project error, ${err} `);
		} finally {
			this.database.close();
		}
	}
}
