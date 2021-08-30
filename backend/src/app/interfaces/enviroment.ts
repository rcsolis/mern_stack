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
	const res = await config({ path: resolve(__dirname, "../../" + fileName) });
	console.error(res);
};
// Exports
export default enviroment;
