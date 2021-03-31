import { createAction, handleActions } from "redux-actions";
import { takeLatest, call, put } from "redux-saga/effects";
import * as api from "../lib/api";
import client from "../lib/client";
import Cookies from "js-cookie";
import createRequestSaga from "../lib/createRequestSaga";

const SET_ACCESS_TOKEN = "auth/SET_ACCESS_TOKEN";
const LOGIN_FAILURE = "auth/LOGIN_FAILURE";
const LOGIN = "auth/LOGIN";
const LOGIN_SUCESS = "auth/LOGIN_SUECSS";

const SET_MY_INFO = "auth/SET_MY_INFO";
const CHECK_MY_INFO = "auth/CHECK_MY_INFO";

export const setAccessToken = createAction(SET_ACCESS_TOKEN, (accessToken: any) => accessToken);
export const login = createAction(LOGIN, ({ userId, password }: any) => ({ userId, password }));

export const setMyInfo = createAction(SET_MY_INFO, (myInfo: any) => myInfo);
export const checkMyInfo = createAction(CHECK_MY_INFO);

const SET_ERROR_MSG = "auth/SET_ERROR_MSG";
export const setErrorMsg = createAction(SET_ERROR_MSG, (errorMsg : any) => errorMsg);

interface login {
  payload: {
    password: string;
    userId: string
  };
  type: string;
}

interface member {
  id: string,
  name: string,
  email: string,
  password: string,
  type: string,
  regDate: string,
  mNo: number,
  authList: []
}

const initialState = {
  accessToken: "",
  loginFailure:"",
  errorMsg:"",
};


function* loginSaga(action: any) {
  try {
    const { userId, password } = action.payload;
    const response = yield call(api.signIn, userId, password);

    const {error} = response.headers;
    if(error !== ""){
      if(error==="pwd"){
        yield put(setErrorMsg("잘못된 비밀번호를 입력하셨습니다.")); 
      }else{
        yield put(setErrorMsg("없는 아이디입니다.")); 
      }
    }else{
      const { authorization } = response.headers;
      const accessToken = authorization.substring(7);
      yield put(setAccessToken(accessToken));  
      client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      Cookies.set("accessToken", accessToken, { expires: 1 });  
    }

  } catch (e) {
    alert('로그인에 실패하였습니다.');
    console.log(e);
  }
}

function* checkMyInfoSaga() {
  try {
    const response = yield call(api.getMyInfo);
    yield put(setMyInfo(response.data));
  } catch (e) {
    console.log(e);
  }
}


export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(CHECK_MY_INFO, checkMyInfoSaga);
}



const auth = handleActions(
  {
    [SET_ACCESS_TOKEN]: (state, action) => ({
      ...state,
      accessToken: String(action.payload),
    }),
    [SET_ERROR_MSG]: (state, action) => ({
      ...state,
      errorMsg: String(action.payload),
    }),
    [LOGIN_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    [SET_MY_INFO]: (state, action) => ({
      ...state,
      myInfo: action.payload,
    }),
  },
  initialState
);

export default auth;