import { Action, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunk, { ThunkAction } from "redux-thunk";
import projectsReducer from "./features/project";
import tasksReducer from "./features/task";

const store = configureStore
    ({
        reducer: {
            projects: projectsReducer,
            tasks: tasksReducer,
        },
        middleware: [ thunk ]
    })
;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<any, RootState, any, Action>;
export const useAppDispatch = () => useDispatch<AppDispatch | AppThunk | any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;