/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Get all pending task
 * @requires entities.Tasks
 */
import { mockTasks } from "../../../mocks/Tasks";
import { iTask } from "../../entities/Tasks";

export default class GetAllPendingTasks {
	private tasks: Array<iTask>;
	constructor() {
		this.tasks = [];
	}

	exec() {
		//Get from database
		const data: Array<iTask> = mockTasks;

		data.forEach((el) => {
			if (el.done === false) this.tasks.push(el);
		});

		return this.tasks;
	}
}
