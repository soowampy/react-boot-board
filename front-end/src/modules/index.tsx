import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./auth";
import category, { categorySaga } from "./category";
import board, { boardSaga } from "./boardSaga";
import loading from "./loading";

const rootReducer = combineReducers({
  auth,
  category,
  loading,
  board,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    categorySaga(),
    boardSaga(),
  ]);
}

export default rootReducer;
