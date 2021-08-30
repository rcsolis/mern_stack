import mongoose from "mongoose";
export interface imProject {
	name: string;
	description: string;
	done: boolean;
	created_at?: Date;
	updated_at?: Date;
}
export const ProjectSchema = new mongoose.Schema<imProject>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	done: { type: Boolean, required: true, default: false },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

export interface imTask {
	name: string;
	projectId: mongoose.Schema.Types.ObjectId;
	done: boolean;
	deadline: Date;
	created_at?: Date;
	updated_at?: Date;
}

export const TaskSchema = new mongoose.Schema<imTask>({
	name: { type: String, required: true },
	projectId: { type: mongoose.Schema.Types.ObjectId, required: true },
	done: { type: Boolean, required: true, default: false },
	deadline: { type: Date, required: true },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});
