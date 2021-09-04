/**
 * @package app.interfaces.database.models
 * @version 1.0.1
 * @author Rafael Chavez
 * @description Define mongodb shcemas
 */

import { iProject } from "app/entities/Project";
import { iTask } from "app/entities/Tasks";
import { Schema } from "mongoose";

export const ProjectSchema = new Schema<iProject>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	done: { type: Boolean, required: true, default: false },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

export const TaskSchema = new Schema<iTask>({
	name: { type: String, required: true },
	projectId: { type: String, required: true },
	done: { type: Boolean, required: true, default: false },
	deadline: { type: Date, required: true },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});
