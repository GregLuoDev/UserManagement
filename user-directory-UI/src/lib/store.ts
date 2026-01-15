import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: rootReducer,
});
export const makeStore = () => store;

export default makeStore;

export const wrapper = createWrapper(makeStore);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
