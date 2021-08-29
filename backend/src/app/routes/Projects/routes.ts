/**
 * @package routes.Projects
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define router and handlers for Projects endpoints
 * @requires express, ProjectController
 */
import { Router } from "express";
import ProjectController from "../../controllers/Project";
//Initialize Router and Controller
const router = Router();
const controller = new ProjectController();
// Define routes and bind to controller handler
router.get("/", controller.getAll);
router.get("/get/:id", controller.getById);
router.get("/done", controller.getDone);
router.get("/pending", controller.getPending);
router.post("/add", controller.create);
router.delete("/delete/:id", controller.deleteById);
router.put("/done/:id", controller.isDone);
router.put("/update/:id", controller.updateById);
// Not found
router.get("*", function (req, res) {
	res.status(404).send("Page Not Found");
});
// Export
const taskRoutes = { path: "/projects", router: router };
export default taskRoutes;	
