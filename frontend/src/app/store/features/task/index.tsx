import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import iTask from "../../../types/task";
import { fetchAllTasks } from "./thunks";

type TaskState = {
    status: "idle" | "pending" | "succeeded" | "failed",
    items: Array<iTask>,
    error: SerializedError | null,
};
const initialState: TaskState = {
    status: "idle",
    items: [],
    error: null,
};
export const taskSlice = createSlice(
    {
        name: "tasks",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(
                fetchAllTasks.pending,
                (state, action) => {
                    if ( state.status === "idle" ) {
                        state.status = "pending";
                        state.error = null;
                        state.items = [];
                    }
                }
            ).addCase(
                fetchAllTasks.fulfilled,
                (state, action) => {
                    if ( state.status === "pending" ) {
                        state.status = "succeeded";
                        state.items = action.payload;
                        state.error = null;
                    }
                }
            ).addCase(
                fetchAllTasks.rejected,
                (state, action) => {
                    if ( state.status === "pending" ) {
                        state.status = "failed";
                        state.items = [];
                        state.error = action.error;
                    }
                }
            );
        }
    }
);
// Export actions
//export const { loadTasks } = taskSlice.actions;
// Export selectors
export const totalTasksSelector = (state: RootState) => state.tasks.items.length;
export const tasksList = (state: RootState) => state.tasks.items;
// Export reducer
export default taskSlice.reducer;