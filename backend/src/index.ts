/**
 * @package src
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Main file to start the API service
 * @requires enviroment, server, morgan, taskRoutes, projectRoutes
 */
import enviroment from "./app/interfaces/enviroment";
import Server from "./app/interfaces/server";
import morgan from "morgan";
import taskRoutes from "./app/routes/Tasks/routes";
import projectRoutes from "./app/routes/Projects/routes";

// Main function
const main = async () => {
	try {
		// Load enviroment variables
		await enviroment(".dev.env");
		// Config database

		// Config server
		const server = new Server(
			[morgan("combined")],
			[projectRoutes, taskRoutes]
		);
		// Run server
		server.run();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};
// Run
main();
