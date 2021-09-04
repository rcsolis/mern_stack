/**
 * @package app.controllers.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define route handlers for tasks
 */
import { Request, Response } from "express";
import FindAllTasks from "../../domain/Tasks/FindAll";
import GetAllDoneTasks from "../../domain/Tasks/GetAllDone";
import GetDoneTasksOfProject from "../../domain/Tasks/GetDoneByProject";
import GetTaskById from "../../domain/Tasks/GetById";
import GetAllPendingTasks from "../../domain/Tasks/GetAllPending";
import GetPendingTasksOfProject from "../../domain/Tasks/GetPendingByProject";
import CreateTask from "../../domain/Tasks/Create";
import UpdateTaskStatus from "../../domain/Tasks/UpdateStatus";
import DeleteTaskById from "../../domain/Tasks/DeleteById";
import UpdateTaskById from "../../domain/Tasks/Update";
import { iTask } from "../../entities/Tasks";
import Logger from "../../interfaces/logger";

export default class TaskController {
	async getAll(request: Request, response: Response) {
		// use case getall projects
		try {
			const useCase = new FindAllTasks();
			const data: Array<iTask> = await useCase.exec();
			// send response
			Logger.info(` Task::getAll:200 ${data}`);
			response.status(200).json(data);

		} catch (err) {
			Logger.error(` Task::getAll:500 ${err}`);
			response.status(500).end(`Unexpected error. ${err}`);
		}
	}

	async getById(request: Request, response: Response) {
		const params = request.params;
		if (!params || !params.id) {
			Logger.warn(` Task::getById:400 Bad request ${params} `);
			response.status(400).end("Bad request, No params.");
		}
		// Use case get by id
		try {
			const useCase = new GetTaskById(params.id);
			const data = await useCase.exec();
			if (!data) {
				Logger.warn(` Task::getById:404 Task not found ${params.id} `);
				response.status(404).end("Task not found");
			}
			
			Logger.info(` Task::getById:200 ${data}`);
			response.status(200).send(data);
		} catch (err) {
			Logger.error(` Task::getById:500 ${err}`);
			response.status(500).end(`Unexpected error. ${err}`);
		}
	}

	async getDone(request: Request, response: Response) {
		// Getting params
		const params = request.params;
		let useCase = null;
		try {
			if (!params || !params.id) {
				// Get all tasks done
				useCase = new GetAllDoneTasks();
			} else {
				// Get all tasks done of the project
				useCase = new GetDoneTasksOfProject(params.id);
			}
			const data: Array<iTask> = await useCase.exec();
			if (!data) {
				Logger.warn(` Task::getDone: 404 Task not found. ${params}`);
				response.status(404).end("Tasks not found");
			}
			Logger.info(` Task::getDone:200 ${params}`);
			response.status(200).json(data);
		} catch (err) {
			Logger.error(` Task::getDone:500 ${err}`);
			response.status(500).end(`Unexpected error. ${err}`);
		}
	}

	async getPending(request: Request, response: Response) {
		// Getting params
		const params = request.params;
		let useCase = null;
		try {
			if (!params || !params.id) {
				// Get all tasks done
				useCase = new GetAllPendingTasks();
			} else {
				// Get all tasks done of the project
				useCase = new GetPendingTasksOfProject(params.id);
			}
			const data: Array<iTask> = await useCase.exec();
			if (!data) {
				Logger.warn(` Task::getPending: 404 Task not found. ${params}`);
				response.status(404).end("Tasks not found");
			}

			Logger.info(` Task::getPending:200 ${params}`);
			response.status(200).json(data);
		} catch (err) {
			Logger.error(` Task::getPending:500 ${err}`);
			response.status(500).end(`Unexpected error. ${err}`);
		}
	}

	async create(request: Request, response: Response) {
		// Getting data
		const body = request.body;
		if (!body) {
			Logger.warn(` Task::create: 400 Bad request, data is missing. ${body}`);
			response.status(400).end("Bad request. Data is missing.");
		}
		// Use case for create
		try {
			const useCase = new CreateTask();
			useCase.setData(body);
			useCase.exec();
			Logger.info(` Task::create:201 OK ${body}`);
			response.status(201).send("Task created.");
		} catch (err) {
			Logger.error(` Task::create:500 ${err}`);
			response.status(500).end(`Unexpected error. ${err}`);
		}
	}

	async deleteById(request: Request, response: Response) {
		// Getting parameters
		const params = request.params;
		if (!params || !params.id) {
			Logger.warn(` Task::deleteById: 400 Bad request, data is missing. ${params}`);
			response.status(400).end("Bad request, No params.");
		}
		// Use case for delete item
		const useCase = new DeleteTaskById(params.id);
		try {
			useCase.exec();
			Logger.info(` Task::deleteById:200 DELETED ${params}`);
			response.status(200).send("Task deleted.");
		} catch (err) {
			Logger.error(` Task::deleteById:500 ${err}`);
			response.status(500).end(`Unexpected error, Delete failed. ${err}`);
		}
	}

	async isDone(request: Request, response: Response) {
		// Getting parameters
		const params = request.params;
		if (!params || !params.id) {
			Logger.warn(` Task::isDone: 400 Bad request, data is missing. ${params}`);
			response.status(400).end("Bad request, No params.");
		}
		//Use case change status
		const useCase = new UpdateTaskStatus(params.id);
		try {
			useCase.exec();
			Logger.info(` Task::isDone:200 UPDATED ${params}`);
			response.status(200).send("Task updated.");
		} catch (err) {
			Logger.error(` Task::isDone:500 ${err}`);
			response.status(500).end(`Unexpected error, Update failed. ${err}`);
		}
	}

	async updateById(request: Request, response: Response) {
		// Getting parameters
		const params = request.params;
		if (!params || !params.id) {
			Logger.warn(` Task::updateById: 400 Bad request, Id missing. ${params}`);
			response.status(400).end("Bad request, No params.");
		}
		// Getting Body
		const body = request.body;
		if (!body) {
			Logger.warn(` Task::updateById: 400 Bad request, data is missing. ${params}`);
			response.status(400).end("Bad request. Data is missing.");
		}
		//Use case for update project
		const useCase = new UpdateTaskById(params.id);
		try {
			useCase.setData(body);
			useCase.exec();
			Logger.info(` Task::updateById:200 UPDATED ${params}`);
			response.status(200).send("Task updated");
		} catch (err) {
			Logger.error(` Task::updateById:500 ${err}`);
			response.status(500).end(`Unexpected error, Update failed. ${err}`);
		}
	}
}
