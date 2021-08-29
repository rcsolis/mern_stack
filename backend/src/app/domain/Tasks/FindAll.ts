/**
 * @package domain.Tasks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Get all tasks
 * @requires entities.Tasks
 */
import { mockTasks } from "../../../mocks/Tasks";
import { iTask } from "../../entities/Tasks";

export default class FindAllTasks {
	private tasks: Array<iTask>;

	constructor() {
		this.tasks = [];
	}

	exec(): Array<iTask> {
		// Get from database
		const data = mockTasks;
		// Parse to Entitys
		data.forEach((row) => {
			this.tasks.push({
				projectId: row.projectId,
				id: row.id,
				name: row.name,
				done: row.done,
				updated_at: row.updated_at,
				created_at: row.created_at,
				deadline: row.deadline,
			});
		});
		return this.tasks;
	}
}
