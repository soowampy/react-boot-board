import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import BoardList from '../pages/board/list';
import BoardRegForm from '../pages/board/regForm';
import BoardDetail from '../pages/board/detail';
import BoardUpdate from '../pages/board/update';
import LoginPage from '../pages/auth/SignInPage';

export const RouterPaths = {
  login: '/loginPage',
  boardList: '/board/list',
  boardRegForm: '/board/regForm',
  boardUpdate: '/board/update/:bNo',
};

const Root: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Route path={`${RouterPaths.login}`} exact component={LoginPage} />
      <Route path={`${RouterPaths.boardList}`} exact component={BoardList} />
      <Route path={`${RouterPaths.boardRegForm}`} exact component={BoardRegForm} />
      <Route path={`${RouterPaths.boardUpdate}`} exact component={BoardUpdate} />
    </Switch>
  </BrowserRouter>
)

// const Root: React.FC = () => (
//   <BrowserRouter>
//     <Switch>
//       <Route path="/" exact component={LoginPage} />
//       <Route path="/loginPage" exact component={LoginPage} />
//       <Route path="/board/list" component={BoardList} />
//       <Route path="/board/regForm" component={BoardRegForm} />
//       <Route path="/board/update/:bNo" component={BoardUpdate} />
//     </Switch>
//   </BrowserRouter>
// )

export default Root;