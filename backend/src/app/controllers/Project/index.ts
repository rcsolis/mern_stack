/**
 * @package app.controllers.Project
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define route handlers for projects
 */
import Logger from "app/interfaces/logger";
import { Request, Response } from "express";
import CreateProject from "../../domain/Projects/Create";
import DeleteProjectById from "../../domain/Projects/DeleteById";
import FindAllProjects from "../../domain/Projects/FindAll";
import GetProjectById from "../../domain/Projects/GetById";
import GetDoneProjects from "../../domain/Projects/GetDone";
import GetPendingProjects from "../../domain/Projects/GetPending";
import UpdateProjectById from "../../domain/Projects/Update";
import UpdateProjectStatus from "../../domain/Projects/UpdateStatus";
import { iProject } from "../../entities/Project";

export default class ProjectController {
	async getAll(request: Request, response: Response) {
		try {
			// use case getall projects
			const useCase = new FindAllProjects();
			const data: Array<iProject> = await useCase.exec();
			// send response
			Logger.info(` Project::getAll:200 ${data}`);
			response.status(200).json(data);
		} catch (err) {
			Logger.error(` Project::getAll ${err}`);
			response.status(500).end(`Unexpected error. ${err}`);
		}
	}

	async getById(request: Request, response: Response) {
		// Get params
		try{
			const params = request.params;
			if (!params || !params.id) {
				Logger.warn(` Project::GetById:400 Bad request, no params ${params}`);
				response.status(400).end("Bad request, No params.");
			}
			// Use case get by id
			const useCase = new GetProjectById(params.id);
			const data = useCase.exec();
			if (!data) {
				Logger.warn(` Project::GetById:404 Not Found ${params}`);
				response.status(404).end("Project not Found");
			}
			// response ok
			Logger.info(` Project::GetById:200 ${data}`);
			response.status(200).json(data);
		}catch (err) {
			Logger.error(` Project::GetById ${err}`);
			response.status(500).end(`Unexpected error. ${err}`);
		}
	}

	async getPending(request: Request, response: Response) {
		// Use case get by id
		try {
			const useCase = new GetPendingProjects();
			const data = useCase.exec();
			// response ok
			Logger.info(` Project::GetPending:200 ${data}`);
			response.status(200).json(data);
		} catch (err) {
			Logger.error(` Project::GetPending ${err}`);
			response.status(500).end(`Unexpected error. ${err}`);
		}
	}

	async getDone(request: Request, response: Response) {
		try {
			// Use case get by id
			const useCase = new GetDoneProjects();
			const data = useCase.exec();
			// response ok
			Logger.info(` Project::GetDone:200 ${data}`);
			response.status(200).json(data);
		} catch (err) {
			Logger.error(` Project::GetDone ${err}`);
			response.status(500).end(`Unexpected error. ${err}`);
		}
	}

	async create(request: Request, response: Response) {
		// Data
		const body = request.body;
		if (!body) {
			Logger.warn(` Project::create:400 Bad request ${body}`);
			response.status(400).end("Bad request. Data is missing.");
		}
		// Use case for create
		const useCase = new CreateProject();
		try {
			useCase.setData(body);
			useCase.exec();
			//Created
			Logger.info(` Project::create:201 ${body}`);
			response.status(201).send("Project created.");
		} catch (err) {
			Logger.error(` Project::create ${err}`);
			response.status(500).end(`Data can not be processed. ${err}`);
		}
	}

	async deleteById(request: Request, response: Response) {
		// Getting parameters
		const params = request.params;
		if (!params || !params.id) {
			Logger.warn(` Project::create:400 Bad request ${params}`);
			response.status(400).end("Bad request, No params.");
		}
		// Use case for delete item
		const useCase = new DeleteProjectById(params.id);
		try {
			useCase.exec();
			Logger.info(` Project::deleteById:200 Deleted ${params}`);
			response.status(200).send("Project deleted.");
		} catch (err) {
			Logger.error(` Project::deleteById ${err}`);
			response.status(500).end(`Delete failed. ${err}`);
		}
	}

	async isDone(request: Request, response: Response) {
		// Getting parameters
		const params = request.params;
		if (!params || !params.id) {
			Logger.warn(` Project::isDone:400 Bad request ${params}`);
			response.status(400).end("Bad request, No params.");
		}
		//Use case change status
		const useCase = new UpdateProjectStatus(params.id);
		try {
			useCase.exec();
			Logger.info(` Project::isDone:200 Deleted ${params}`);
			response.status(200).send("Project updated.");
		} catch (err) {
			Logger.error(` Project::isDone ${err}`);
			response.status(500).end(`Update failed. ${err}`);
		}
	}

	async updateById(request: Request, response: Response) {
		// Getting parameters
		const params = request.params;
		if (!params || !params.id) {
			Logger.warn(` Project::updateById:400 Bad request ${params}`);
			response.status(400).end("Bad request, No params.");
		}
		// Getting Body
		const body = request.body;
		if (!body) {
			Logger.warn(` Project::updateById:400 Data is missing ${body}`);
			response.status(400).end("Bad request. Data is missing.");
		}
		//Use case for update project
		const useCase = new UpdateProjectById(params.id);
		try {
			useCase.setData(body);
			useCase.exec();
			Logger.info(` Project::updateById:200 Updated ${params}`);
			response.status(200).send("Project updated");
		} catch (err) {
			Logger.error(` Project::updateById ${err}`);
			response.status(500).end(`Update failed. ${err}`);
		}
	}
}
