/**
 * @package interfaces
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Load enviroment variables stored into a .env file
 * @requires path, dotenv
 */
import { resolve } from "path";
import { config } from "dotenv";
// Load enviroment variables
const enviroment = async (fileName: string) => {
	await config({ path: resolve(__dirname, "../" + fileName) });
};
// Exports
export default enviroment;
