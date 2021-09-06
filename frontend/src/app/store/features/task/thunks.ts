import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import iTask from "../../../types/task";


export const fetchAllTasks = createAsyncThunk<Array<iTask>, void,
    { state: RootState; }>
(
    "tasks/findAll",
    async (args, thunkApi) => {
        const currentState = thunkApi.getState().tasks;
        if ( currentState.status !== "pending" ) {
            return;
        }
        const response = await fetch("http://localhost:8088/tasks/",
            {
                method: "GET",
                cache: "no-cache",
                mode: "cors",
                credentials: "same-origin",
                referrerPolicy: "no-referrer",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        return response.json();
    }
);