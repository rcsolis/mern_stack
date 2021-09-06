import { createAsyncThunk } from "@reduxjs/toolkit";
import iProject from "../../../types/project";
import { RootState } from "../../index";

export const fetchAllProjects = createAsyncThunk<Array<iProject>, void, {
    state: RootState;
}>(
    "projects/findAll",
    async (_, thunkApi) => {
        const currState = thunkApi.getState().projects;
        if ( currState.status !== "pending" ) {
            return;
        }
        const response = await fetch("http://localhost:8088/projects", {
                method: "GET",
                cache: "no-cache",
                mode: "cors",
                credentials: "same-origin",
                referrerPolicy: "no-referrer",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.json();
    }
);
