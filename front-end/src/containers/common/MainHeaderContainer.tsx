import React from "react";
import { connect, useDispatch } from "react-redux";
import MainHeader from "../../components/common/MainHeader";
import { getAuthorized } from "../../modules/selector";
import { setAccessToken, setMyInfo } from "../../modules/auth";
import client from "../../lib/client";
import Cookies from "js-cookie";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';


const MainHeaderContainer = ({ isAuthorized, myInfo }: any) => {
  const dispatch = useDispatch();
  const onLogout = () => {
    delete client.defaults.headers.common.Authorization;
    Cookies.remove("accessToken");

    dispatch(setAccessToken(""));
    dispatch(setMyInfo(null));
    window.location.href = "/loginPage";
  };

  return (
    <React.Fragment>
      <MainHeader
        myInfo={myInfo}
        isAuthorized={isAuthorized}
        onLogout={onLogout}
      />
    </React.Fragment>
  );
};

export default connect((state: any) => {
  return {
    isAuthorized: getAuthorized(state),
    myInfo: state.auth.myInfo,
  };
})(MainHeaderContainer);
