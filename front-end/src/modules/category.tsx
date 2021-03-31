import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import {categoryList} from "../lib/api";
import createRequestSaga from "../lib/createRequestSaga";

export const FETCH_CATE_LIST = "category/FETCH_CATE_LIST";
const FETCH_CATE_LIST_SUCCESS = "category/FETCH_CATE_LIST_SUCCESS";
const FETCH_CATE_LIST_FAILURE = "category/FETCH_CATE_LIST_FAILURE";

export const fetchCateList = createAction(FETCH_CATE_LIST);


const fetchCateListSaga = createRequestSaga(FETCH_CATE_LIST, categoryList);

export function* categorySaga() {
  yield takeLatest(FETCH_CATE_LIST, fetchCateListSaga);
}

const initialState = {
  error: null,
  categorys:[]
};


const category = handleActions(
  {
    [FETCH_CATE_LIST]: (state:any) => ({
      ...state,
      categorys:[]
    }),
    [FETCH_CATE_LIST_SUCCESS]: (state, action) => ({
      ...state,
      categorys: action.payload,
    }),
    [FETCH_CATE_LIST_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState
);


export default category;
