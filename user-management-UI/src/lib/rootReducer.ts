// store/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";

const rootReducer = combineReducers({
  task: taskReducer,
});

export default rootReducer;
