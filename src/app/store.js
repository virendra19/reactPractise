import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userDetails from "../features/userSlice";

const reducers = combineReducers({
    userApp: userDetails,
})

export const store = configureStore({
    reducer: reducers
})