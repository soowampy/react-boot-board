import React, { useState, useCallback, useEffect, } from 'react';
import Button, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Carousel from 'react-material-ui-carousel'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import ReactLoading from 'react-loading';
import Loading from "../../components/common/ListLoading";

import ReactPhotoGrid from '../board/grid/PhotoGrid'


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'lightbox-react/style.css';
import "react-image-lightbox/style.css"

import prettyBytes from 'pretty-bytes';

import "./index.css";

import CloseIcon from '@material-ui/icons/Close';

import * as api from "../../lib/api";
import ScrollTop from '../../containers/board/ScrollTop';

import { Link } from "react-router-dom";
import { checkMyInfo } from '../../modules/auth';

// slick 설정
function Arrow(props: any) {
    let className = props.type === "next" ? "nextArrow" : "prevArrow";
    className += " arrow";
    const char = props.type === "next" ? ">" : "<";
    return (
        <span className={className} onClick={props.onClick} style={{ fontSize: "50pt" }}>
            {char}
        </span>
    );
}

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

}

// style
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        heroContent: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(0, 6),
            paddingBottom: theme.spacing(10)
        },
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ButtonProps {
    color: 'red' | 'blue';
}

const ButtonStyles = makeStyles({
    root: {
        background: (props: ButtonProps) =>
            props.color === 'red'
                ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: (props: ButtonProps) =>
            props.color === 'red'
                ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
                : '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: 8,
    },
});

function MyButton(props: ButtonProps & Omit<MuiButtonProps, keyof ButtonProps>) {
    const { color, ...other } = props;
    const buttonStyle = ButtonStyles(props);
    return <Button className={buttonStyle.root} {...other} />;
}

const useTableStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function BoardList(props: any) {

    const tableClasses = useTableStyles();
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [bNo, setbNo] = useState(0);

    //modal
    const [open, setOpen] = useState(false);
    const openModal = (bNo: number) => {
        //props.onDetail(bNo);
        setbNo(bNo);
        setDeleteOpen(true);
    };
    const closeModal = () => {
        setOpen(false);
    };
    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }

    function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const useModalStyles = makeStyles((theme: Theme) =>
        createStyles({
            paper: {
                position: 'absolute',
                width: 400,
                backgroundColor: theme.palette.background.paper,
                border: '2px solid #000',
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3),
            },
        }),
    );

    const modalClasses = useModalStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    // dialog
    const classes = useStyles();
    const [diaOpen, setDiaOpen] = React.useState(false);

    const handleClickOpen = (bNo: number) => {
        props.onDetail(bNo);
        setbNo(bNo);
        setDiaOpen(true);
    };

    const handleClickClose = () => {
        setDiaOpen(false);
    };

    const fileDownload = async (fileNo: number, originName: string) => {
        await api.fileDownload(fileNo, originName);
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const boardUpdate = (bNo: string) => {
        document.location.href = "/board/update/" + bNo;
    }

    // delete
    const boardDelete = async () => {
        await api.boardDelete(String(bNo));
        document.location.href = "/board/list";
    }

    //dialog
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const dialogOpen = () => {
        setDeleteOpen(true);
    };
    const dialogClose = () => {
        setDeleteOpen(false);
    };

    // order
    const [age, setAge] = useState('');
    const orderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    const [allPage, setAllPage] = useState('');
    const getAllPage = async () => {
        const temp = await api.allPage();
        setAllPage(temp.data.result)
    }
    useEffect(() => {
        getAllPage();
    }, [])

    return (
        <React.Fragment>
            <Dialog fullScreen open={diaOpen} onClose={handleClickClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClickClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {!!props.board && props.board.title}
                        </Typography>

                    </Toolbar>
                </AppBar>
                <List>
                    <Container maxWidth="lg" >
                        {!!props.board &&
                            <Carousel autoPlay={false}
                                animation={"slide"}
                                indicators={true}
                                navButtonsAlwaysVisible={true}>
                                {!!props.board.fileList && props.board.fileList.map((file: any, index: number) => (
                                    <>
                                        {file.fileKinds === 'MEDIA' ?
                                            <>
                                                {file.mediaType === 'IMG' ?
                                                    <div style={{ textAlign: "center" }}>
                                                        <img width={400} height={400} alt="" src={`${window.location.protocol}//${window.location.hostname}:${window.location.port}${file.thumbPath}`} />
                                                    </div>
                                                    :
                                                    <>
                                                        {file.mediaType === 'VIDEO' ?
                                                            <p style={{ textAlign: "center" }}>
                                                                <video width={800} height={350} controls >
                                                                    {/* <source src={`http://localhost:8800${file.path}`}></source> */}
                                                                    <source src={`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/videos/${file.fileNo}`}></source>
                                                                </video>
                                                            </p>
                                                            :
                                                            <div style={{ marginTop: "200px", marginBottom: "200px", textAlign: "center" }}>
                                                                <audio style={{ width: "500px" }} controls src={`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/videos/${file.fileNo}`} />
                                                            </div>
                                                        }
                                                    </>
                                                }
                                            </>
                                            :
                                            <>
                                                <div style={{ textAlign: "center" }}>
                                                    <img width={400} height={400} alt="" src='/image/default/file_default.png' />
                                                </div>
                                            </>
                                        }
                                        <br></br><br></br>
                                        <Container maxWidth="md">
                                            <Paper>
                                                <TableContainer>
                                                    <Table className={tableClasses.table} size="small" aria-label="a dense table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell><p>파일 정보</p></TableCell>
                                                                <TableCell>
                                                                    {file.fileKinds === 'MEDIA' ?
                                                                        <>
                                                                            {file.mediaType === 'IMG' ?
                                                                                <>이미지 파일 &nbsp;&nbsp;<a href={`${window.location.protocol}//${window.location.hostname}:${window.location.port}${file.path}`} target="_blank"><span style={{ color: "hotpink" }}>원본보기</span></a></>
                                                                                :
                                                                                <>
                                                                                    {file.mediaType === 'VIDEO' ?
                                                                                        <>비디오 파일</>
                                                                                        :
                                                                                        <>
                                                                                            {file.mediaType === 'AUDIO' ?
                                                                                                <>오디오 파일</>
                                                                                                :
                                                                                                <>일반 파일</>
                                                                                            }
                                                                                        </>
                                                                                    }
                                                                                </>
                                                                            }
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <p>일반 파일</p>
                                                                        </>
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell component="th" scope="row">
                                                                    <p>파일명</p>
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {file.originName}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell component="th" scope="row">
                                                                    <p>카테고리</p>
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {!!props.board && props.board.cateList}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell component="th" scope="row">
                                                                    <p>작성자</p>
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {props.board.mName}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell component="th" scope="row">
                                                                    <p>등록날짜</p>
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {file.enrollDate.substring(0, 4)}-{file.enrollDate.substring(4, 6)}-{file.enrollDate.substring(6, 8)}
                                                &nbsp;&nbsp;{file.enrollDate.substring(8, 10)}:{file.enrollDate.substring(10, 12)}:{file.enrollDate.substring(12, 14)}

                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell component="th" scope="row">
                                                                    <p>크기</p>
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {prettyBytes(file.size)}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell component="th" scope="row">
                                                                    <p>태그</p>
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {props.board.bTag ? <>#{props.board.bTag}</> : <>등록된 태그가 없습니다.</>}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell component="th" scope="row">
                                                                    <p>다운로드</p>
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    <Button size="small" color="primary" onClick={() => fileDownload(file.fileNo, file.originName)}>
                                                                        다운로드
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Paper>
                                        </Container>
                                    </>
                                )
                                )}
                            </Carousel>
                        }
                    </Container>
                </List>
            </Dialog>
            <div className={classes.heroContent}>
                <Container maxWidth="lg">
                    {/* <div style={{ display: "flex" }}>
                        <span style={{ flex: "1" }}>총 {props.totalPage && props.totalPage}건의 미디어가 출력됩니다.</span>
                        <span style={{ flex: "1", textAlign: "right" }}>

                        </span>
                    </div> */}
                    <Grid container spacing={4} style={{ marginBottom: "100px" }} >
                        {props.isLoading &&
                            <Loading />
                        }

                        {props.isSearchLoading &&
                            <Loading />
                        }


                        {!!props.boards && !props.isLoading && props.boards.map((board: any) => (
                            <>

                                <Grid item key={board} xs={12} sm={6} md={4}>
                                    <Card>
                                        <CardActionArea>
                                            <a href="#" onClick={() => handleClickOpen(board.bNo)}>
                                                {!!board.fileList &&
                                                    <div style={{ width: "100%", height: "300px" }}>
                                                        <ReactPhotoGrid
                                                            data={board.fileList.map((file: any, index: number) => (
                                                                file
                                                            ))}
                                                            fileLength={board.fileListLength}
                                                        />
                                                    </div>
                                                }
                                                <CardContent >
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        <p>{board.title}</p>
                                                    </Typography>
                                                    <Typography>
                                                        <p>{board.mName} ({board.mId})</p>
                                                    </Typography>
                                                    <Typography>
                                                        <p>등록일 : {board.enrollDate.substring(0, 4)}-{board.enrollDate.substring(4, 6)}-{board.enrollDate.substring(6, 8)}
                                                    &nbsp;&nbsp;{board.enrollDate.substring(8, 10)}:{board.enrollDate.substring(10, 12)}:{board.enrollDate.substring(12, 14)}
                                                        </p>
                                                    </Typography>
                                                    <Typography>
                                                        <p style={{ color: 'gray' }}>{board.cateName} </p>
                                                    </Typography>
                                                    <Typography>
                                                        {board.bTag ? <p style={{ color: 'blue' }}>#{board.bTag} </p> : <p><br></br></p>}
                                                    </Typography>
                                                </CardContent>
                                            </a>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary" onClick={() => handleClickOpen(board.bNo)}>
                                                상세보기
                                            </Button>
                                            <Button size="small" color="primary" onClick={() => boardUpdate(board.bNo)}>
                                                수정
                                            </Button>
                                            {!!props.myInfo && props.myInfo.id === board.mId ?
                                                <Button size="small" color="primary" onClick={() => openModal(board.bNo)}>
                                                    삭제
                                                </Button>
                                                :
                                                <>
                                                    {!!props.myInfo && props.myInfo.type === "ROLE_ADMIN" ?
                                                        <Button size="small" color="primary" onClick={() => openModal(board.bNo)}>
                                                            삭제
                                            </Button> :
                                                        <></>}
                                                </>
                                            }

                                        </CardActions>
                                    </Card>

                                </Grid>
                            </>
                        ))}
                        {props.isMoreLoading &&
                            <Loading />
                        }

                    </Grid>
                    <Dialog
                        open={deleteOpen}
                        onClose={dialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"삭제하겠습니까?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                삭제된 게시글은 다시 복구하실 수 없습니다.
                                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <MyButton color="red" onClick={() => boardDelete()} >삭제</MyButton>
                            <MyButton color="blue" onClick={() => dialogClose()} >취소</MyButton>
                        </DialogActions>
                    </Dialog>
                    <ScrollTop {...props}></ScrollTop>
                </Container>
            </div>
        </React.Fragment >
    )
}