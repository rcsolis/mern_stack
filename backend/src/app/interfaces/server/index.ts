/**
 * @package interfaces.server
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define application server
 * @requires express, server.types
 */
import express, { Application } from "express";
import { RouteType } from "./types";

export default class Server {
	private app: Application;

	constructor(middlewares: Array<any>, routers: Array<RouteType>) {
		//Create app
		this.app = express();
		// Config app
		const port: number = process.env.PORT ? +process.env.PORT : 3000;
		this.app.set("port", port);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		// Add custom middlewares
		middlewares.forEach((element) => {
			this.app.use(element);
		});
		// Add routers
		routers.forEach((element) => {
			console.log("Register", element.path);
			this.app.use(element.path, element.router);
		});

		this.app.get("*", function (req, res) {
			res.status(404).send("Page Not Found");
		});
	}

	run() {
		this.app.listen(this.app.get("port"), () => {
			console.log(`Server is listening on port ${this.app.get("port")}!`);
		});
	}
}
