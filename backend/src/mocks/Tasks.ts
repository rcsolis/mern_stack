/**
 * @package mocks
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Mock data of tasks
 * @requires express, iTask, domain.Tasks.FindAll
 */
import { iTask } from "../app/entities/Tasks";

export const mockTasks: Array<iTask> = [
	{
		projectId: "p111",
		id: "t123324",
		name: "Task 1 Project 1",
		done: false,
		deadline: new Date("2021/08/30"),
		created_at: new Date("2021/08/28"),
		updated_at: new Date("2021/08/28"),
	},
	{
		projectId: "p111",
		id: "t9999",
		name: "Task 2 Project 1",
		done: false,
		deadline: new Date("2021/08/30"),
		created_at: new Date("2021/08/05"),
		updated_at: new Date("2021/08/05"),
	},
	{
		projectId: "p111",
		id: "t6788999",
		name: "Task 3 Project 1",
		done: true,
		deadline: new Date("2021/08/10"),
		created_at: new Date("2021/07/20"),
		updated_at: new Date("2021/07/20"),
	},
	{
		projectId: "p222",
		id: "t2341231",
		name: "Task 1 Project 2",
		done: true,
		deadline: new Date("2021/08/30"),
		created_at: new Date("2021/08/28"),
		updated_at: new Date("2021/08/28"),
	},
];
