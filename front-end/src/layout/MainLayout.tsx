import React from "react";
import MainHeaderContainer from "../containers/common/MainHeaderContainer";
import Container from '@material-ui/core/Container';


function MainLayout({ children }: any) {
  return (
    <div>
      <MainHeaderContainer />
      {children}
    </div>
  );
}

export default MainLayout;
