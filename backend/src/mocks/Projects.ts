import { iProject } from "../app/entities/Project";

export const mockProjects: Array<iProject> = [
	{
		id: "p111",
		name: "Typescrypt + MERN",
		description: "MERN app with Typescript",
		created_at: new Date("2021/01/12"),
		updated_at: new Date("2021/01/12"),
		done: false,
	},
	{
		id: "p222",
		name: "Find My Pet",
		description: "Sample App with MERN stack and Typescript",
		created_at: new Date("2021/07/03"),
		updated_at: new Date("2021/07/03"),
		done: false,
	},
];
