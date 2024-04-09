import { configureStore } from "@reduxjs/toolkit";
import { TasksSlice } from "./slices/tasksSlice";

export const store = configureStore({
    reducer:{
        taskstore:TasksSlice.reducer
    }
})

