/**
 * @package interfaces.server
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define types for the application server
 * @requires express
 */
import { Router } from "express";
// Type for router middleware
export type RouteType = {
	path: string;
	router: Router;
};
