import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";

import createRequestSaga from "../lib/createRequestSaga";


/**
 * 상세보기
 *  */
export const FETCH_ONE = "board/FETCH_ONE";
const FETCH_ONE_SUCCESS = "board/FETCH_ONE_SUCCESS";
const FETCH_ONE_FAILURE = "board/FETCH_ONE_FAILURE";
export const fetchOne = createAction(FETCH_ONE, (boardNo: number) => boardNo);
const fetchOneSaga = createRequestSaga(FETCH_ONE, api.fetchBoard);

export const TAG = "board/TAG";
const TAG_SUCCESS = "board/TAG_SUCCESS";
const TAG_FAILURE = "board/TAG_FAILURE";
export const tag = createAction(TAG, (boardNo: number) => boardNo);
const tagSaga = createRequestSaga(TAG, api.tag);

/***
 * 리스트
 */
export const FETCH_LIST = "board/FETCH_LIST";
const FETCH_LIST_SUCCESS = "board/FETCH_LIST_SUCCESS";
const FETCH_LIST_FAILURE = "board/FETCH_LIST_FAILURE";
export const fetchList = createAction(FETCH_LIST, (page: number) => page);
const fetchListSaga = createRequestSaga(FETCH_LIST, api.fetchBoardList);

export const FETCH_MORE_LIST = "board/FETCH_MORE_LIST";
const FETCH_MORE_LIST_SUCCESS = "board/FETCH_MORE_LIST_SUCCESS";
const FETCH_MORE_LIST_FAILURE = "board/FETCH_MORE_LIST_FAILURE";
//export const fetchMoreList = createAction(FETCH_MORE_LIST, (page: number, search: string) => page);
interface search {
    page?: number,
    category?: string,
    strDate?: string,
    endDate?: string
    tagList?: string

}
export const fetchMoreList = createAction(FETCH_MORE_LIST, (param: search) => param);
const fetchMoreListSaga = createRequestSaga(FETCH_MORE_LIST, api.fetchBoardMoreList);

export const FETCH_SEARCH_LIST = "board/FETCH_SEARCH_LIST";
const FETCH_SEARCH_LIST_SUCCESS = "board/FETCH_SEARCH_LIST_SUCCESS";
const FETCH_SEARCH_LIST_FAILURE = "board/FETCH_SEARCH_LIST_FAILURE";
//export const fetchSearchList = createAction(FETCH_SEARCH_LIST, (category: String) => category);
export const fetchSearchList = createAction(FETCH_SEARCH_LIST, (searchParam: search) => searchParam);

const fetchSearchListSaga = createRequestSaga(FETCH_SEARCH_LIST, api.fetchBoardSearchList);




export const TOTAL_PAGE = "board/TOTAL_PAGE";
const TOTAL_PAGE_SUCCESS = "board/TOTAL_PAGE_SUCCESS";
const TOTAL_PAGE_FAILURE = "board/TOTAL_PAGE_FAILURE";
export const getTotalPage = createAction(TOTAL_PAGE, (searchParam: search) => searchParam);
const totalPageSaga = createRequestSaga(TOTAL_PAGE, api.totalPage);




/**
 * 태그리스트
 */
export const TAG_LIST = "board/TAG_LIST";
const TAG_LIST_SUCCESS = "board/TAG_LIST_SUCCESS";
const TAG_LIST_FAILURE = "board/TAG_LIST_FAILURE";
export const tagList = createAction(TAG_LIST);
const tagListSaga = createRequestSaga(TAG_LIST, api.tagList);


/**
 * 카테고리리스트
 */
export const FETCH_CATE_LIST = "category/FETCH_CATE_LIST";
const FETCH_CATE_LIST_SUCCESS = "category/FETCH_CATE_LIST_SUCCESS";
const FETCH_CATE_LIST_FAILURE = "category/FETCH_CATE_LIST_FAILURE";
export const fetchCateList = createAction(FETCH_CATE_LIST);
const fetchCateListSaga = createRequestSaga(FETCH_CATE_LIST, api.categoryList);


/**
 * 파일 첨부
 *  */
const ADD_ATTACH = "board/ADD_ATTACH";
export const addAttach = createAction(ADD_ATTACH, (attach: any) => attach);

const ADD_BIG_ATTACH = "board/ADD_BIG_ATTACH";
export const addBigAttach = createAction(ADD_BIG_ATTACH, (attach: any) => attach);


export function* boardSaga() {
    yield takeLatest(FETCH_ONE, fetchOneSaga);
    yield takeLatest(FETCH_LIST, fetchListSaga);
    yield takeLatest(FETCH_MORE_LIST, fetchMoreListSaga);
    yield takeLatest(TOTAL_PAGE, totalPageSaga);
    yield takeLatest(TAG, tagSaga);
    yield takeLatest(TAG_LIST, tagListSaga);
    yield takeLatest(FETCH_CATE_LIST, fetchCateListSaga);
    yield takeLatest(FETCH_SEARCH_LIST, fetchSearchListSaga);
}

const initialState = {
    board: null,
    boards: [],
    moreBoards: [],
    searchBoards: [],
    boardItem: null,
    boardItems: [],
    attachments: [],
    tag: [],
    categorys: [],
    error: null,
    totalPage: 0
};

const board = handleActions(
    {
        [FETCH_CATE_LIST]: (state: any) => ({
            ...state,
            categorys: []
        }),
        [FETCH_CATE_LIST_SUCCESS]: (state, action) => ({
            ...state,
            categorys: action.payload,
        }),
        [FETCH_CATE_LIST_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),

        [FETCH_LIST]: (state: any) => ({
            ...state,
            boards: [],
        }),
        [FETCH_LIST_SUCCESS]: (state, action) => ({
            ...state,
            boards: action.payload,
        }),
        [FETCH_LIST_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),


        [FETCH_MORE_LIST]: (state: any) => ({
            ...state,
            moreBoards: [],
        }),
        [FETCH_MORE_LIST_SUCCESS]: (state, action) => ({
            ...state,
            moreBoards: action.payload,
        }),
        [FETCH_MORE_LIST_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),

        [FETCH_SEARCH_LIST]: (state: any) => ({
            ...state,
            moreBoards: [],
        }),
        [FETCH_SEARCH_LIST_SUCCESS]: (state, action) => ({
            ...state,
            searchBoards: action.payload,
        }),
        [FETCH_SEARCH_LIST_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),


        [TOTAL_PAGE]: (state: any) => ({
            ...state,
            totalPage: 0,
        }),
        [TOTAL_PAGE_SUCCESS]: (state, action) => ({
            ...state,
            totalPage: action.payload,
        }),
        [TOTAL_PAGE_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),

        [FETCH_ONE]: (state: any) => ({
            ...state,
            board: null,
        }),
        [FETCH_ONE_SUCCESS]: (state, action) => ({
            ...state,
            board: action.payload,
        }),
        [FETCH_ONE_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),



        [ADD_ATTACH]: (state, { payload: attach }: any) => {
            const newAttach = state.attachments.concat(attach);
            return {
                ...state,
                attachments: newAttach,
            }
        },

        [ADD_BIG_ATTACH]: (state, { payload: attach }: any) => {
            const newBigAttach = state.attachments.concat(attach);
            return {
                ...state,
                attachments: newBigAttach,
            }
        },

        [TAG]: (state: any) => ({
            ...state,
            tag: [],
        }),
        [TAG_SUCCESS]: (state, action) => ({
            ...state,
            tag: action.payload,
        }),
        [TAG_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),

        [TAG_LIST]: (state: any) => ({
            ...state,
            tag: [],
        }),
        [TAG_LIST_SUCCESS]: (state, action) => ({
            ...state,
            tag: action.payload,
        }),
        [TAG_LIST_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),
    },
    initialState
)
export default board;
