import React, { useState, useCallback, useEffect } from 'react';
import Button, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Input from '@material-ui/core/Input';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-dropzone-uploader/dist/styles.css'
import ChipInput from 'material-ui-chip-input'
import '../board/dropzone/styles.css';

import ReactLoading from 'react-loading';
import { arrayToTree } from 'performant-array-to-tree'
import TableHead from '@material-ui/core/TableHead';
import prettyBytes from 'pretty-bytes';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FolderIcon from "@material-ui/icons/Folder";
import { setSyntheticTrailingComments } from 'typescript';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const barStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }),
);

const StyledTreeItem = withStyles((theme: Theme) =>
    createStyles({
        iconContainer: {
            '& .close': {
                opacity: 0.3,
            },
        },
        group: {
            marginLeft: 7,
            paddingLeft: 18,
            borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
        },
    }),
)((props: TreeItemProps) => <TreeItem {...props} />);

const useTreeStyles = makeStyles(
    createStyles({
        root: {
            height: 264,
            flexGrow: 1,
            maxWidth: 400,
        },
    }),
);



const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));



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

const useSearchStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

const useTableStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Album(
    props: any
) {

    // 파일 정보 테이블
    function createData(originName: string, fileKinds: string, size: number, fileNo: number) {
        return { originName, fileKinds, size, fileNo };
    }

    const [rows, setRows] = useState<any[]>([])

    const tableClasses = useTableStyles();
    const classes = useStyles();
    const searchStyle = useSearchStyles();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    interface f {
        file: File,
        meta: [],
    }

    const [file, setFile] = useState<Array<f>>([]);
    const [tag, setTag] = useState<Array<any>>([]);

    // 처음에
    useEffect(() => {
        if (props.boardDetail !== null &&
            props.boardDetail.fileList.length > 0 &&
            props.boardDetail.fileList.length > rows.length) {
            setTitle(props.boardDetail.title);

            props.boardDetail.fileList.map((file: any) => {
                rows.push(createData(file.originName, file.fileKinds, file.size, file.fileNo));
            })
        }

        if (props.tags != null &&
            props.tags.length > 0) {
            let temp: any[] = [];
            for (let i = 0; i < props.tags.length; i++) {
                temp.push(props.tags[i].tagName);
            }
            setTag(temp);
        }
    }, [props])


    const tagOnChange = useCallback((e) => {
        setTag(e);
    }, []);

    const titleOnChange = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    let flag = true;

    const bStyle = barStyles();
    const handleChangeStatus = ({ meta }: any, status: any) => {
    }
    const handleSubmit = (files: any, allFiles: any) => {
        setFile(allFiles);
    }
    const componentConfig = {
        sending: null,
    }

    const [loading, setLoading] = useState(false);

    /***
     * 카테고리~~~~
     */
    let trees: any[] = [{}];
    if (props.categorys != null && props.categorys.length != 0) {
        const arr = props.categorys;
        trees = arrayToTree(arr, { dataField: null })
    }
    interface TreeViews {
        children?: TreeViews[];
        custom: string;
        id: string;
    }
    interface CategoryProps {
        category: TreeViews
    }
    const renderTrees = (nodes: TreeViews) => (
        <StyledTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.custom}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTrees(node)) : null}
        </StyledTreeItem>
    );
    const Category = ({ category }: CategoryProps) => {
        useEffect(() => {

        }, [category]);
        return renderTrees(category);
    }
    const useTreeStyles = makeStyles({
        root: {
            flexGrow: 1,
            textAlign: 'left',
        },
    });
    const treeClasses = useTreeStyles();
    const handleToggle = (event: any, nodeIds: string[]) => {
        event.persist()
    };
    //카테고리 선택
    const handleNodeSelect = (event: any, nodeId: React.SetStateAction<string>) => {
        setCategory(nodeId);
    };


    /**
     * 태그~~
     */
    const defaultValue: any[] = [];
    // 기존태그 불러오기
    if (props.tags.length > 0) {
        props.tags.map((tag: any) => {
            defaultValue.push(tag.tagName);
        })
    }

    /***
     * 파일삭제
     */
    const [files, setFiles] = useState<number[]>([]);
    const [deleteFileNo, setDeleteFileNo] = useState(0);
    const deleteFile = useCallback((fileNo: number) => {
        handleClickFileOpen();
        setDeleteFileNo(fileNo);

        // setRows(rows.filter(row => row.fileNo !== fileNo))
        // setFiles([...files, fileNo]);
    }, [rows]);

    const dFile = useCallback(() => {
        setRows(rows.filter(row => row.fileNo !== deleteFileNo))
        setFiles([...files, deleteFileNo]);
        handleFileClose();
    }, [deleteFileNo])

    /**
     * 수정!!
     */
    const [validation, setValidation] = useState("");
    const fileUpdate = useCallback(async (e) => {
        e.preventDefault();
        if (title === "") {
            setValidation("제목을 입력해주세요")
            handleClickOpen();
        } else {
            props.onUpdate(title, category, tag, files);
        }
    }, [title, category, tag, files]);


    //dialog
    const [open, setOpen] = React.useState(false);
    const [fileOpen, setFileOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickFileOpen = () => {
        setFileOpen(true);
    };
    const handleFileClose = () => {
        setFileOpen(false);
    };

    const selectCancel = () => {
        document.location.href = "/board/list";
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Toolbar style={{ display: "inline" }} id="back-to-top-anchor" />
            <main>
                {loading &&
                    <>
                        <div className="contentWrap">
                            <div style={{
                                position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                            }}>
                                <h2>전송중입니다</h2>
                                <ReactLoading type="spin" color="black" height={'80%'} width={'80%'} />
                            </div>
                        </div>
                    </>
                }
                <div className={classes.cardGrid}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                            <b>게시글 수정</b>
                        </Typography>
                    </Container>
                    <form onSubmit={fileUpdate}>
                        <Container maxWidth="md">
                            <p style={{ fontSize: "14pt" }}>* 제목</p>
                            <Paper className={searchStyle.paper}>
                                {!!props.boardDetail &&
                                    <Input autoFocus fullWidth onChange={titleOnChange} defaultValue={props.boardDetail.title} />
                                }
                            </Paper>
                        </Container>
                        <br></br>
                        <br></br>
                        <Container maxWidth="md">
                            <p style={{ fontSize: "14pt" }}>* 카테고리 선택</p>
                            <Paper className={searchStyle.paper}>
                                {!!props.categorys && props.categorys.length > 0 && props.boardDetail && (
                                    <TreeView
                                        onNodeToggle={handleToggle}
                                        defaultSelected={props.boardDetail && String(props.boardDetail.cateId)}
                                        onNodeSelect={handleNodeSelect}
                                        className={treeClasses.root}
                                        defaultCollapseIcon={<FolderIcon />}
                                        defaultExpandIcon={<FolderIcon />}
                                        defaultEndIcon={<FolderIcon />}
                                        multiSelect={false}
                                        expanded={props.categorys.map((group: TreeViews) => group.id + '')}
                                    >
                                        <div>
                                            {trees.map((category: TreeViews) => {
                                                return <Category key={category.id} category={category} />
                                            })}
                                        </div>
                                    </TreeView>
                                )}
                            </Paper>
                        </Container>
                        <br></br>
                        <br></br>
                        <Container maxWidth="md">
                            <p style={{ fontSize: "14pt" }}>해시태그 입력</p>
                            <Paper className={searchStyle.paper}>
                                <ChipInput
                                    defaultValue={defaultValue}
                                    placeholder='태그를 입력하고 엔터'
                                    onChange={tagOnChange}
                                />
                            </Paper>
                        </Container>
                        <br></br>
                        <br></br>
                        <Container maxWidth="md">
                            <p style={{ fontSize: "14pt" }}>* 파일 선택</p>
                            <Paper className={searchStyle.paper}>
                                <TableContainer>
                                    <Table className={tableClasses.table} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><b>파일 이름</b></TableCell>
                                                <TableCell><b>파일 크기</b></TableCell>
                                                <TableCell><b>삭제</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        {row.originName}
                                                    </TableCell>
                                                    <TableCell>{prettyBytes(row.size)}</TableCell>
                                                    <TableCell>
                                                        <div onClick={() => deleteFile(row.fileNo)}><img src="https://www.freeiconspng.com/uploads/remove-icon-png-4.png" width="20" alt="Remove Files Free" /></div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Container>
                        <br></br>
                        <br></br>
                        <Container maxWidth="md">
                            <Box textAlign='center'>
                                <MyButton color="blue" type="submit">수정하기</MyButton>
                                <MyButton color="red" onClick={selectCancel}>취소</MyButton>
                            </Box>
                        </Container>
                    </form>
                </div>
            </main>


            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"수정 실패!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {validation && validation}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            확인
                </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
                <Dialog
                    open={fileOpen}
                    onClose={handleFileClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"파일 삭제"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            해당 파일을 정말 삭제하시겠습니까?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={dFile} color="primary">
                            삭제
                        </Button>
                        <Button onClick={handleFileClose} color="primary">
                            취소
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </React.Fragment>
    );
}