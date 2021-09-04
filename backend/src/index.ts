/**
 * @package src
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Main file to start the application
 */
import enviroment from "./app/interfaces/enviroment";
import Server from "./app/interfaces/server";

class App{
	server:unknown;

	async run () {
		try {
			// Load enviroment variables
			await enviroment(".dev.env");
			// Config server
			const server = new Server();
			await server.bootstrap();
			// Run server
			server.run();
			this.server = server.app;
		} catch (err) {
			console.error(err);
			process.exit(1);
		}
	}
}

// Run
const app = new App();
app.run();
export default app;
