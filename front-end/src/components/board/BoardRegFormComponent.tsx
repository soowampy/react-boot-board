import React, { useState, useCallback, useEffect } from 'react';
import Button, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Input from '@material-ui/core/Input';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-dropzone-uploader/dist/styles.css'
import ChipInput from 'material-ui-chip-input'
import Dropzone from '../board/dropzone/Dropzone';
import '../board/dropzone/styles.css';
import ReactLoading from 'react-loading';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import { arrayToTree } from 'performant-array-to-tree'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FolderIcon from "@material-ui/icons/Folder";

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

export default function Album(
  props: any,
) {


  useEffect(() => {
    if (props.attachments.length != 0 && props.attachments.length == file.length) {
      //setValidation('등록 완료')
      //handleClickOpen();
      document.location.href = "/board/list";
    }
  }, [props.attachments]);

  const classes = useStyles();
  const searchStyle = useSearchStyles();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  interface f {
    file: File,
    meta: [],
  }

  const [file, setFile] = useState<Array<f>>([]);
  const [tag, setTag] = useState([]);

  //dialog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const back = () => {
    document.location.href = "/board/list";
  }

  const fileOnChange = useCallback((e) => {
    setOpen(true);
    console.log(e.target);
    setFile(e[0]);
  }, []);

  const tagOnChange = useCallback((e) => {
    setTag(e);
  }, []);

  const titleOnChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const [validation, setValidation] = useState("");

  const fileUpload = useCallback(async (e) => {
    e.preventDefault();

    // 0. validation
    if (title === "") {
      setValidation("제목을 입력해주세요")
      handleClickOpen();
    } else if (category === "") {
      setValidation("카테고리를 선택해주세요")
      handleClickOpen();
    } else if (file.length === 0) {
      setValidation("파일을 입력해주세요")
      handleClickOpen();
    } else {

      setLoading(true);
      setLoad("upload")
      // 1. board dbdlqfur
      const bNo = await props.onRegister(title, category, tag);
      let fileLevel = 0;
      // 2. 파일 전송
      //const files :File = file[0];
      const list: any[] = [];
      let flag = false;
      let bigFileLength = 0;

      for (let i = 0; i < file.length; i++) {
        const f: File = file[i].file;
        // 10메가이상일때
        if (f.size >= 10485760) {
          flag = true;
          // 20메가이상 분할 업로드
          const fileName: string = f.name;
          //f.arrayBuffer().then(async () => {
          const numberOfSlices = Math.ceil(f.size / 10485760)
          const chunkSize = 10485760;
          let startByte: number;
          // 10mb씩 분할 업로드
          fileLevel++;
          bigFileLength++;

          for (let i = 0; i < numberOfSlices; i += 1) {
            if (i == numberOfSlices - 1) {
              //마지막
              startByte = chunkSize * (numberOfSlices - 1);
            } else {
              //10메가씩
              startByte = chunkSize * i;
            }
            const b: Blob = f.slice(
              startByte,
              startByte + chunkSize,
              f.type
            )

            list.push({
              "file": b,
              "fileName": fileName,
              "bNo": String(bNo),
              "fileLevel": String(fileLevel),
              "numberOfSlices": String(numberOfSlices),
              "size": f.size
            })
          }
        } else {
          // multipart로 업로드하기
          fileLevel++;
          await props.onAddAttach(f, bNo, fileLevel, f.size);
        }
      }

      if (flag) {
        // 대용량업로드
        await props.onAddBigAttach(list, bigFileLength);
      }
    }
  }, [file, title, category, tag]);

  let flag = true;

  // 카테고리
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
  const handleNodeSelect = (event: any, nodeId: React.SetStateAction<string>) => {
    setCategory(nodeId);
  };

  const bStyle = barStyles();


  const handleChangeStatus = useCallback((upFile: any, status: any, files: any[],) => {
    setFile(files);
  }, [file]);

  const handleSubmit = (files: any, allFiles: any) => {
    setFile(allFiles);
  }

  const componentConfig = {
    sending: null,
  }

  const [loading, setLoading] = useState(false);
  const selectCancel = () => {
    document.location.href = "/board/list";
  }

  const [load, setLoad] = useState("all");

  return (
    <React.Fragment>
      <CssBaseline />
      <Toolbar style={{ display: "inline" }} id="back-to-top-anchor" />
      <main className={load}>
        {loading &&
          <>
            <div className="contentWrap">
              <div style={{
                position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 100
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
              <b>게시글 등록</b>
            </Typography>
          </Container>
          <form onSubmit={fileUpload}>
            <Container maxWidth="md">
              <p style={{ fontSize: "14pt" }}>* 제목</p>
              <Paper className={searchStyle.paper}>
                <Input
                  fullWidth
                  onChange={titleOnChange}
                  autoFocus
                />
              </Paper>
            </Container>
            <br></br>
            <br></br>
            <Container maxWidth="md">
              <p style={{ fontSize: "14pt" }}>* 카테고리 선택</p>
              <Paper className={searchStyle.paper}>
                {props.categorys.length > 0 && (
                  <TreeView
                    onNodeToggle={handleToggle}
                    onNodeSelect={handleNodeSelect}
                    className={treeClasses.root}
                    defaultCollapseIcon={<FolderIcon />}
                    defaultExpandIcon={<FolderIcon />}
                    defaultEndIcon={<FolderIcon />}
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
                  placeholder='태그를 입력하고 엔터'
                  onChange={tagOnChange}
                />
              </Paper>
            </Container>
            <br></br>
            <br></br>
            <Container maxWidth="md">
              <p style={{ fontSize: "14pt" }}>* 파일 선택</p>
              <Dropzone
                onChangeStatus={handleChangeStatus}
                inputContent={"파일을 드래그하거나 클릭해서 업로드 해주세요"}
                inputWithFilesContent={"파일 추가"}
                autoUpload={false}

              ></Dropzone>
            </Container>
            <br></br>
            <br></br>
            <Container maxWidth="md">
              <Box textAlign='center'>
                <MyButton color="blue" type="submit">등록하기</MyButton>
                <MyButton color="red" onClick={back} >취소</MyButton>
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
          <DialogTitle id="alert-dialog-title">{"등록 실패!"}</DialogTitle>
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

    </React.Fragment >
  );
}