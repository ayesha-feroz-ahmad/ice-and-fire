import { combineReducers } from "@reduxjs/toolkit";
import BooksSlice from "./BooksSlice";


// combine reducer
const MainReducer = combineReducers({
   books:BooksSlice

});

export const rootReducer = (state, action) => {
  if (action.type === "DESTROY_SESSION") {
    state = undefined
  }
  return MainReducer(state, action);
}