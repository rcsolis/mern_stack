/**
 * @package controllers.Project
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define route handlers for projects
 * @requires express, domain.Projects.Create, domain.Projects.DeleteById,domain.Projects.FindAll,domain.Projects.GetById,domain.Projects.GetDone,domain.Projects.GetPending,domain.Projects.Update, domain.Projects.UpdateStatus
 */
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
			response.status(200).json(data);
		} catch (err) {
			console.error(err);
			response.status(500).end(`Unexpected error. ${err}`);
		}
	}

	async getById(request: Request, response: Response) {
		// Get params
		const params = request.params;
		if (!params || !params.id)
			response.status(400).end("Bad request, No params.");
		// Use case get by id
		const useCase = new GetProjectById(params.id);
		const data = useCase.exec();
		if (!data) response.status(404).end("Project not Found");
		// response ok
		response.status(200).json(data);
	}

	async getPending(request: Request, response: Response) {
		// Use case get by id
		const useCase = new GetPendingProjects();
		const data = useCase.exec();
		// response ok
		response.status(200).json(data);
	}

	async getDone(request: Request, response: Response) {
		// Use case get by id
		const useCase = new GetDoneProjects();
		const data = useCase.exec();
		// response ok
		response.status(200).json(data);
	}

	async create(request: Request, response: Response) {
		// Data
		const body = request.body;
		if (!body) {
			response.status(400).end("Bad request. Data is missing.");
		}
		// Use case for create
		const useCase = new CreateProject();
		try {
			useCase.setData(body);
			useCase.exec();
			response.status(201).send("Project created.");
		} catch (err) {
			console.error(err);
			response.status(500).end(`Data can not be processed. ${err}`);
		}
	}

	async deleteById(request: Request, response: Response) {
		// Getting parameters
		const params = request.params;
		if (!params || !params.id)
			response.status(400).end("Bad request, No params.");
		// Use case for delete item
		const useCase = new DeleteProjectById(params.id);
		try {
			useCase.exec();
			response.status(200).send("Project deleted.");
		} catch (err) {
			console.error(err);
			response.status(500).end(`Delete failed. ${err}`);
		}
	}

	async isDone(request: Request, response: Response) {
		// Getting parameters
		const params = request.params;
		if (!params || !params.id)
			response.status(400).end("Bad request, No params.");
		//Use case change status
		const useCase = new UpdateProjectStatus(params.id);
		try {
			useCase.exec();
			response.status(200).send("Project updated.");
		} catch (err) {
			console.error(err);
			response.status(500).end(`Update failed. ${err}`);
		}
	}

	async updateById(request: Request, response: Response) {
		// Getting parameters
		const params = request.params;
		if (!params || !params.id)
			response.status(400).end("Bad request, No params.");
		// Getting Body
		const body = request.body;
		if (!body) {
			response.status(400).end("Bad request. Data is missing.");
		}
		//Use case for update project
		const useCase = new UpdateProjectById(params.id);
		try {
			useCase.setData(body);
			useCase.exec();
			response.status(200).send("Project updated");
		} catch (err) {
			console.error(err);
			response.status(500).end(`Update failed. ${err}`);
		}
	}
}
