/**
 * @package controllers.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define route handlers for tasks
 * @requires express, entities.iTask, domain.Tasks.FindAll, domain.Tasks.GetAllDoneTasks, domain.Tasks.GetDoneTasksOfProject, domain.Tasks.GetTaskById, domain.Tasks.GetAllPendingTasks, domain.Tasks.GetPendingTasksOfProject, domain.Tasks.Create, domain.Tasks.UpdateStatus, domain.Tasks.DeleteById, domain.Tasks.Update
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

export default class TaskController {
	async getAll(request: Request, response: Response) {
		// use case getall projects
		try {
			const useCase = new FindAllTasks();
			const data: Array<iTask> = await useCase.exec();
			// send response
			response.status(200).json(data);
		} catch (err) {
			console.error(err);
			response.status(500).end(`Unexpected error. ${err}`);
		}
	}

	async getById(request: Request, response: Response) {
		const params = request.params;
		if (!params || !params.id)
			response.status(400).end("Bad request, No params.");
		// Use case get by id
		try {
			const useCase = new GetTaskById(params.id);
			const data = await useCase.exec();
			if (!data) response.status(404).end("Task not found");
			response.status(200).send(data);
		} catch (err) {
			console.error(err);
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
			if (!data) response.status(404).end("Tasks not found");
			response.status(200).json(data);
		} catch (err) {
			console.error(err);
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
			if (!data) response.status(404).end("Tasks not found");
			response.status(200).json(data);
		} catch (err) {
			console.error(err);
			response.status(500).end(`Unexpected error. ${err}`);
		}
	}

	async create(request: Request, response: Response) {
		// Getting data
		const body = request.body;
		if (!body) {
			response.status(400).end("Bad request. Data is missing.");
		}
		// Use case for create
		try {
			const useCase = new CreateTask();
			useCase.setData(body);
			useCase.exec();
			response.status(201).send("Task created.");
		} catch (err) {
			console.error(err);
			response.status(500).end(`Unexpected error. ${err}`);
		}
	}

	async deleteById(request: Request, response: Response) {
		// Getting parameters
		const params = request.params;
		if (!params || !params.id)
			response.status(400).end("Bad request, No params.");
		// Use case for delete item
		const useCase = new DeleteTaskById(params.id);
		try {
			useCase.exec();
			response.status(200).send("Task deleted.");
		} catch (err) {
			console.error(err);
			response.status(500).end(`Unexpected error, Delete failed. ${err}`);
		}
	}

	async isDone(request: Request, response: Response) {
		// Getting parameters
		const params = request.params;
		if (!params || !params.id)
			response.status(400).end("Bad request, No params.");
		//Use case change status
		const useCase = new UpdateTaskStatus(params.id);
		try {
			useCase.exec();
			response.status(200).send("Task updated.");
		} catch (err) {
			console.error(err);
			response.status(500).end(`Unexpected error, Update failed. ${err}`);
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
		const useCase = new UpdateTaskById(params.id);
		try {
			useCase.setData(body);
			useCase.exec();
			response.status(200).send("Task updated");
		} catch (err) {
			console.error(err);
			response.status(500).end(`Unexpected error, Update failed. ${err}`);
		}
	}
}
