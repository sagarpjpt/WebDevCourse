import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./slices/pasteSlice";

export const store = configureStore({
    reducer: {
        paste: pasteReducer,
    }
})
