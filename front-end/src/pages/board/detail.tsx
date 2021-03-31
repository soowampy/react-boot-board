import React, { useState, useCallback } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import { styled } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import TextField from '@material-ui/core/TextField';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { DropzoneArea } from 'material-ui-dropzone';
import { WithContext as ReactTags } from 'react-tag-input';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone, { IDropzoneProps, ILayoutProps } from 'react-dropzone-uploader'
import ChipInput from 'material-ui-chip-input'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MainHeaderContainer from "../../containers/common/MainHeaderContainer";


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


interface RenderTree {
  id: string;
  name: string;
  children?: RenderTree[];
}

// 트리
const data: RenderTree = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1',
    },
    {
      id: '3',
      name: 'Child - 3',
      children: [
        {
          id: '4',
          name: 'Child - 4',
        },
      ],
    },
  ],
};












const useTreeStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
    textAlign: 'left',
  },
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



const renderTree = (nodes: RenderTree) => (
  <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
    {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
  </TreeItem>
);

const gStyle = {
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
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

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];



// add type defs to custom LayoutComponent prop to easily inspect props passed to injected components
const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }: ILayoutProps) => {
  return (
    <div>
      {previews}

      <div {...dropzoneProps}>{files.length < maxFiles && input}</div>

      {files.length > 0 && submitButton}
    </div>
  )
}


export default function Album(id: string) {
  const classes = useStyles();
  const searchStyle = useSearchStyles();
  const treeStyle = useTreeStyles();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState('');
  const [tag, setTag] = useState([]);


  const fileOnChange = useCallback((e) => {
    setFile(e);
  }, []);

  const tagOnChange = useCallback((e) => {
    setTag(e);
  }, []);

  const titleOnChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);


  const cardStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  const cardStyle = cardStyles();
  const bull = <span className={cardStyle.bullet}>•</span>;

  const bStyle = barStyles();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  return (


    <React.Fragment>
      <CssBaseline />
      <MainHeaderContainer />
      <Toolbar style={{ display: "inline" }} id="back-to-top-anchor" />
      <main>
        <div className={classes.cardGrid}>
          <Container maxWidth="md">
            <Typography component="h3" variant="h3" align="left" color="textPrimary" gutterBottom>
              <b>제목</b>
                &nbsp;&nbsp;
                <Button variant="contained">수정</Button>&nbsp;
                <Button variant="contained" color="secondary">삭제</Button>
            </Typography>
            <hr />
          </Container>
          <Container maxWidth="md">
            <TableContainer component={Paper} style={{ backgroundColor: "whitesmoke" }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell>Calories</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>d</TableCell>
                    <TableCell>asf</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>d</TableCell>
                    <TableCell>asf</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>d</TableCell>
                    <TableCell>asf</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

          </Container>
          <br></br>
          <br></br>
          <Container maxWidth="md">
            <Card className={cardStyle.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  사진
                        </Typography>
                <br></br>
                <Typography className={cardStyle.pos} color="textSecondary">
                  <Slider {...settings}>
                    <div>
                      <a href="https://imgscience.ytn.co.kr/sciencetv/jpg/vod0082/2018/201801241239156078_h.jpg"><img width="100%" src="https://imgscience.ytn.co.kr/sciencetv/jpg/vod0082/2018/201801241239156078_h.jpg" /></a>
                    </div>
                    <div>
                      <img width="100%" src="https://img.hani.co.kr/imgdb/resize/2019/1015/00501921_20191015.JPG" />
                    </div>
                    <div>
                      <img width="100%" src="https://imgscience.ytn.co.kr/sciencetv/jpg/vod0082/2018/201801241239156078_h.jpg" />
                    </div>
                  </Slider>
                </Typography>
              </CardContent>
            </Card>
          </Container>
          <br></br>
          <br></br>
          <br></br>
          <Container maxWidth="md">
            <Card className={cardStyle.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  비디오
                        </Typography>
                <br></br>
                <Typography className={cardStyle.pos} color="textSecondary">
                  <video src='http://www.tomodevel.jp/material/video/disneyTour.mp4' width='400' controls>
                    해당 브라우저는 video 태그를 지원하지 않습니다.
                            </video>
                </Typography>
              </CardContent>
            </Card>
          </Container>

        </div>
      </main>
    </React.Fragment>
  );
}