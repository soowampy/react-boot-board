import React, { useEffect, useState, useRef, useCallback } from 'react';
import Button, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import TextField from '@material-ui/core/TextField';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FolderIcon from "@material-ui/icons/Folder";
import { arrayToTree } from 'performant-array-to-tree'
import { format } from 'fecha';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Loading from "../../components/common/CateLoading";
import DateRangeIcon from '@material-ui/icons/DateRange';
import ReactLoading from 'react-loading';
import CircularProgress from '@material-ui/core/CircularProgress';
import CategoryIcon from '@material-ui/icons/Category';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
/***
 * 트리 스타일
 */
function MinusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}

function PlusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
}

function CloseSquare(props: SvgIconProps) {
    return (
        <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}

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


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(0, 6),
        paddingTop: theme.spacing(8),
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

const useDateStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);


export default function Album(
    props: any
) {

    const classes = useStyles();
    const searchStyle = useSearchStyles();
    const dateStyle = useDateStyles();

    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: true,
        checkedD: false,
        checkedE: false,
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    // 검색어
    const [condition, setCondition] = useState('title');
    const searchChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCondition(event.target.value as string);
    };
    const [keyword, setKeyword] = useState('');
    const searchKeywordChange = useCallback((e) => {
        setKeyword(e.target.value);
    }, []);

    interface tag {
        tagName: string,
        tagId: number,
        tagLength?: string,
        tagCount?: number,
    }

    interface tagList {
        title: string,
        year?: number,
        tagLength?: string,
        tagCount?: number,
    }

    let tags: tagList[] = [{ title: '' }];

    if (props.tag != null && props.tag.length > 0) {
        tags = props.tag.map((t: tag) => {
            return {
                title: t.tagName,
                year: t.tagId,
                tagLength: t.tagName + "()",
            }
        })
    }


    const gStyle = {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    }

    let trees: any[] = [{}];

    if (props.categorys.length != 0) {
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

    const treeClass = useTreeStyles();


    const [expanded, setExpanded] = useState([]);
    const [selected, setSelected] = useState([]);

    const handleToggle = (event: any, nodeIds: string[]) => {
        event.persist()
    };

    /**
     * 검색
     */
    // 카테고리 선택
    const [category, setCategory] = useState('');
    const handleNodeSelect = (event: any, nodeId: React.SetStateAction<string>) => {
        setCategory(nodeId);
    };

    // 태그 선택
    const [selectTagList, setSelectTagList] = useState([]);
    // const selectTag = useCallback((event: object, value: any, reason: string) => {
    //     setSelectTagList(value);
    // }, [])

    const [checkedItems, setCheckedItems] = useState(new Set());
    const checkedItemHandler = (id: string, isChecked: boolean) => {
        if (isChecked) {
            checkedItems.add(id);
            setCheckedItems(checkedItems);
        } else if (!isChecked && checkedItems.has(id)) {
            checkedItems.delete(id);
            setCheckedItems(checkedItems);
        }
    };

    const [bChecked, setChecked] = useState(false);
    const selectTag = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) setCheckedItems(checkedItems.add(event.target.name));
        else if (!event.target.checked && checkedItems.has(event.target.name)) checkedItems.delete(event.target.name);
    }, [])

    // 날짜 선택
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const selectStartDate = useCallback((e: any) => {
        const d: Date = e.target.valueAsDate;
        const farseDate: string = format(d, 'YYYYMMDD000000');
        setStartDate(farseDate);
    }, [])

    const selectEndDate = useCallback((e: any) => {
        const d: Date = e.target.valueAsDate;
        const farseDate: string = format(d, 'YYYYMMDD235959');
        setEndDate(farseDate);
    }, [])

    const [order, setOrder] = useState("desc");

    const orderChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
        setOrder(event.target.value as string);
        console.log(event.target.value)

    }, []);


    useEffect(() => {
        onOrder();
    }, [order])

    const onOrder = useCallback(() => {
        const arr = Array.from(checkedItems);
        props.onSearch(category, arr, startDate, endDate, condition, keyword, order)
    }, [category, checkedItems, startDate, endDate, condition, keyword, order])

    const search = useCallback(() => {
        const arr = Array.from(checkedItems);
        props.onSearch(category, arr, startDate, endDate, condition, keyword, order)
    }, [category, checkedItems, startDate, endDate, condition, keyword, order])

    const treeClasses = useTreeStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <Toolbar style={{ display: "inline" }} id="back-to-top-anchor" />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>

                        </Typography>
                    </Container>
                    <Container maxWidth="lg">
                        <Grid container spacing={3}>
                            <Grid item xs={2}>
                                <p style={{ fontSize: "14pt" }}><SearchIcon />&nbsp;&nbsp;키워드</p>
                            </Grid>
                            <Grid item xs={10}>
                                <Paper className={searchStyle.paper}>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={condition}
                                        onChange={searchChange}
                                        style={{ width: "15%" }}
                                    >
                                        <MenuItem value={"title"}>제목</MenuItem>
                                        <MenuItem value={"writer"}>작성자 아이디</MenuItem>
                                    </Select>
                                    <Input
                                        style={{ width: "65%" }}
                                        inputProps={{ 'aria-label': 'description' }}
                                        onChange={searchKeywordChange}
                                    />
                                </Paper>
                            </Grid>


                            <Grid item xs={2}>
                                <p style={{ fontSize: "14pt" }}><FormatListBulletedIcon></FormatListBulletedIcon> &nbsp;&nbsp; 카테고리</p>
                            </Grid>
                            <Grid item xs={10}>
                                <Paper className={searchStyle.paper}>
                                    {props.isLoading && new Array(1).fill(1).map((_, i) => {
                                        return <Loading />;
                                    })}
                                    {!props.isLoading && props.categorys.length > 0 && (
                                        <TreeView
                                            onNodeToggle={handleToggle}
                                            onNodeSelect={handleNodeSelect}
                                            defaultSelected={props.categorys && props.categorys[0].id}
                                            className={treeClass.root}
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
                            </Grid>
                            <Grid item xs={2}>
                                <p style={{ fontSize: "14pt" }}><DateRangeIcon />&nbsp;&nbsp; 작성 날짜</p>
                            </Grid>
                            <Grid item xs={10}>
                                <Paper className={searchStyle.paper}>
                                    <TextField
                                        id="date"
                                        type="date"
                                        className={dateStyle.textField}
                                        onChange={selectStartDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TrendingFlatIcon />
                                    <TextField
                                        id="date"
                                        type="date"
                                        className={dateStyle.textField}
                                        onChange={selectEndDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={2}>
                                <p style={{ fontSize: "14pt" }}><LocalOfferIcon />&nbsp;&nbsp;해시태그</p>
                            </Grid>
                            <Grid item xs={10}>
                                <Paper className={searchStyle.paper} style={{ textAlign: "left" }}>
                                    {props.isTagLoading &&
                                        <div style={{ marginLeft: "50%", marginTop: "5%", marginBottom: "5%" }}>
                                            <ReactLoading type="spin" color="black" height={'50px'} width={'50px'} />
                                        </div>}
                                    {!props.isTagLoading && !!props.tag && props.tag.length > 0 && props.tag.map((t: tag) => {
                                        const tLength = t.tagName + " (" + t.tagCount + ")";
                                        return <FormControlLabel
                                            control={<Checkbox onChange={selectTag} name={String(t.tagId)} />}
                                            label={tLength}
                                        />
                                    })
                                    }
                                </Paper>
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: "50px" }} >
                                <Box textAlign='center'>
                                    <MyButton color="red" onClick={search}>검색</MyButton>
                                    <a href="/board/regForm"><MyButton color="blue">새 게시글 등록</MyButton></a>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </main>
            <div className={classes.heroContent}>
                <Container maxWidth="lg">
                    <div style={{ display: "flex" }}>
                        <span style={{ flex: "1" }}>총 {props.totalPage && props.totalPage}건의 미디어가 출력됩니다.</span>
                        <span style={{ flex: "1", textAlign: "right" }}>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={order}
                                onChange={orderChange}
                                label="Age"
                            >
                                <MenuItem value={"desc"}>최근 날짜순</MenuItem>
                                <MenuItem value={"asc"}>오래된 날짜순</MenuItem>
                            </Select>
                        </span>
                    </div>
                </Container>
            </div>

        </React.Fragment >
    );
}