/**
 * @package app.interfaces.server
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define application server
 */
import cors from "cors";
import helmet from "helmet";
import morgan, { StreamOptions } from "morgan";
import express, { Application } from "express";
import { RouteType } from "./types";
import taskRoutes from "app/routes/Tasks/routes";
import projectRoutes from "app/routes/Projects/routes";
import Logger from "../logger";

export default class Server {
	app: Application;
	private routes: Array<RouteType>;

	constructor() {
		// Create app
		this.app = express();
		// add routes
		this.routes = [projectRoutes, taskRoutes];
	}

	async bootstrap() {
		// Config app
		const port: number = process.env.PORT ? +process.env.PORT : 0;
		this.app.set("port", port);
		this.app.use(cors());
		this.app.use(helmet());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		//Configure logger system
		const stream: StreamOptions = {
			write: (message)=>Logger.http(message)
		};
		this.app.use(morgan(
			"combined",
			{stream}
		));
		// Add routers
		this.routes.forEach((element) => {
			Logger.debug(`Register routes: ${element.path}`);
			this.app.use(element.path, element.router);
		});
		// default route
		this.app.get("*", function (req, res) {
			Logger.warn(` Page not found, ${req}`);
			res.status(404).end("Page Not Found");
		});
	}
	// Run the server
	run() {
		this.app.listen(this.app.get("port"), () => {
			Logger.debug(`Server is listening on port ${this.app.get("port")}!`);
		});
	}
}
