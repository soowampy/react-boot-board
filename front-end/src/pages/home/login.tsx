import React, { useState, useCallback, useEffect,useRef } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInForm({ onSignIn,errorMsg }: any) {

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUserId = useCallback((e) => {
    setUserId(e.target.value);
  }, []);

  const handleChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSignIn(userId, password);
      setPassword("");
    },
    [userId, password, onSignIn]
  );
  const classes = useStyles();

  const idRef = useRef<HTMLElement>()
  const pwdRef = useRef<HTMLElement>()

  useEffect(() => {
    if(errorMsg!=""){
      if(errorMsg ==="없는 아이디입니다."){
        const currentEl = idRef.current
        currentEl && currentEl.focus();
      }else{
        const currentEl = pwdRef.current
        currentEl && currentEl.focus();
      }
    }
  }, [errorMsg]);


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="아이디 입력"
            name="email"
            autoComplete="false"
            autoFocus
            value={userId}
            onChange={handleChangeUserId}
            inputRef = {idRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호 입력"
            type="password"
            id="password"
            autoComplete="false"
            value={password}
            onChange={handleChangePassword}
            inputRef = {pwdRef}
          />
          <div style={{color:"hotpink"}}>
            {errorMsg && errorMsg}
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            로그인
          </Button>
        </form>
      </div>

    </Container>
  );
}