import { configureStore } from "@reduxjs/toolkit";
import  {createWrapper} from "next-redux-wrapper";
import todosReducer from "./todoSlice";

const makeStore = () => configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export const wrapper = createWrapper(makeStore);