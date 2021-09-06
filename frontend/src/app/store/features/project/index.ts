import iProject from "../../../types/project";
import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import { fetchAllProjects } from "./thunks";
// State
type ProjectState = {
    status: "idle" | "pending" | "succeeded" | "failed",
    items: Array<iProject>
    error: SerializedError | null,
};
// Initial state
const initialState: ProjectState = {
    status: "idle",
    items: [],
    error: null,
};
// Slice
export const projectSlice = createSlice(
    {
        name: "projects",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(fetchAllProjects.pending,
                (state, _) => {
                    if ( state.status === "idle"
                        || state.status === "succeeded"
                        || state.status === "failed" ) {
                        state.status = "pending";
                        state.items = [];
                        state.error = null;
                    }
                }).addCase(fetchAllProjects.fulfilled,
                (state,
                 action: any) => {
                    if ( state.status === "pending" ) {
                        state.status = "succeeded";
                        state.items = action.payload;
                        state.error = null;
                    }
                }).addCase(fetchAllProjects.rejected,
                (state, action) => {
                    if ( state.status === "pending" ) {
                        state.status = "failed";
                        state.items = [];
                        state.error = action.error as SerializedError;
                    }
                });
        }
    }
)
// Export actions
//export const {} = projectSlice.actions;
// Export selectors
export const totalProjectsSelector = (state: RootState) => state.projects.items.length;
export const projectsList = (state: RootState) => state.projects.items;// Export reducer
export default projectSlice.reducer;