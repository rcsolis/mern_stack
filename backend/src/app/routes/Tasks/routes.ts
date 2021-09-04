/**
 * @package app.routes.Projects
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define router and handlers for Tasks endpoints
 */
import { Router } from "express";
import TaskController from "../../controllers/Tasks";
// Initialize Router and Controller
const router = Router();
const controller = new TaskController();
// Define routes and bind to controller handler
router.get("/", controller.getAll);
router.get("/get/:id", controller.getById);
router.get("/done/:id?", controller.getDone);
router.get("/pending/:id?", controller.getPending);
router.post("/add", controller.create);
router.delete("/delete/:id", controller.deleteById);
router.put("/finish/:id", controller.isDone);
router.put("/update/:id", controller.updateById);
// Not found
router.get("*", function (req, res) {
	res.status(404).send("Page Not Found");
});
// Export
const taskRoutes = { path: "/tasks", router: router };
export default taskRoutes;
