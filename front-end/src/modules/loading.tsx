import { createAction, handleActions } from "redux-actions";

const START_LOADING = "loading/START_LOADING";
const END_LOADING = "loading/END_LOADING";

export const startLoading = createAction(
  START_LOADING,
  (actionType:string) => actionType
);

export const endLoading = createAction(
  END_LOADING,
  (actionType:string) => actionType
);


const initialState = {};

const loading = handleActions(
  {
    [START_LOADING]: (state, action:any) => ({
      ...state,
      [action.payload]: true,
    }),
    [END_LOADING]: (state, action:any) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState
);

export default loading;
