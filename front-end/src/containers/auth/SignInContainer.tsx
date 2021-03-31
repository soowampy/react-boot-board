import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignInForm from "../../pages/home/login";
import { withRouter } from "react-router-dom";
import { checkMyInfo, login } from "../../modules/auth";


const SignInContainer = ({ history }: any) => {
  const dispatch = useDispatch();

  const { accessToken, myInfo,errorMsg } = useSelector(({ auth }: any) => ({
    accessToken: auth.accessToken,
    myInfo: auth.myInfo,
    errorMsg:auth.errorMsg
  }));

  const onSignIn = (userId: string, password: string) => {
    try {
      dispatch(login({ userId, password }));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    
  }, [errorMsg, dispatch]);


  useEffect(() => {
      if (accessToken) {
        dispatch(checkMyInfo());
      }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (myInfo) {
      document.location.href = "/board/list";
    }
  }, [myInfo, history]);

  return <SignInForm onSignIn={onSignIn} errorMsg={errorMsg}/>;
};

export default withRouter(SignInContainer);
