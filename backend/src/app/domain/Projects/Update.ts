/**
 * @package app.domain.Projects.Update
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Use case for Update project by id
 * @requires types
 */
import MongoAdapter from "app/interfaces/database/mongo";
import Logger from "app/interfaces/logger";
import { iProject } from "../../entities/Project";
import { UpdateProject } from "./types";

export default class UpdateProjectById {
	private id: string;
	private assigned: boolean;
	private project: iProject;
	private database: MongoAdapter;

	constructor(id: string) {
		this.id = id.trim();
		this.project = {
			name: "",
			description: "",
			updated_at: new Date(),
			created_at: new Date(),
			done: false,
		};
		this.assigned = false;
		this.database = new MongoAdapter();
		this.database.connect();
	}

	setData(nproject: UpdateProject) {
		if (!nproject.name.trim() || nproject.name.trim() === "")
			throw new Error("Project name is required");
		if (!nproject.description.trim() || nproject.name.trim() === "")
			throw new Error("Project description is required");

		this.project.name = nproject.name.trim();
		this.project.description = nproject.description.trim();
		this.project.done = nproject.done;
		this.assigned = true;
	}

	async exec() {
		if (!this.assigned) {
			throw new Error("Updated data is not assigned");
		}
		// Save to database
		try {
			const document = await this.database.ProjectModel.findByIdAndUpdate(this.id, {
				$set: {
					name: this.project.name,
					description: this.project.description,
					done: this.project.done,
					updated_at: this.project.updated_at
				}
			}, {
				upsert: true
			});
			if (!document) {
				throw new Error(` Update project fail, ${this.id} ${this.project} `);
			}
			Logger.info(`Project updated ${this.id} ${document}`);
		} catch (err) {
			Logger.error(` Error on update project by id, ${err} `);
			throw new Error(` Error on update project by id, ${err} `);
		} finally {
			this.database.close();
		}
	}
}
