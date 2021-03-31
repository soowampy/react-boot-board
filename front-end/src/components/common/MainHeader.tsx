import React from "react";
import { Link, useLocation } from 'react-router-dom';
import Button, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Icon from '@material-ui/core/Icon';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AddIcon from '@material-ui/icons/Add';
import { RouterPaths } from '../../routes/index';
//{!isAuthorized && !myInfo && <Link to="/signin">로그인</Link>}


function MainHeader({ myInfo, isAuthorized, onLogout }: any) {

  const gStyle = {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  }

  const drawerWidth = 240;

  const useSideStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
  );

  const sideClasses = useSideStyles();


  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  const location = useLocation();


  return (

    <div>
      {isAuthorized && myInfo && (
        <div className={sideClasses.root}>
          <AppBar position="fixed" style={gStyle}>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={sideClasses.title} noWrap>
                <a href="/board/list"><img width='150px'src="/image/default/logo.png"/></a>
              </Typography>
              <Typography>
                <span>{myInfo.name}님 환영합니다.&nbsp;&nbsp;</span>
                <Button color="inherit" onClick={onLogout}>LOGOUT</Button>
              </Typography>
            </Toolbar>
          </AppBar>
          </div>
      )}
    </div>
  );
}

export default MainHeader;
