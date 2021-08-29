/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Get all task done
 * @requires entities.Tasks
 */
import { mockTasks } from "../../../mocks/Tasks";
import { iTask } from "../../entities/Tasks";

export default class GetAllDoneTasks {
	private tasks: Array<iTask>;
	constructor() {
		this.tasks = [];
	}

	exec() {
		//Get from database
		const data: Array<iTask> = mockTasks;

		data.forEach((el) => {
			if (el.done === true) this.tasks.push(el);
		});

		return this.tasks;
	}
}
