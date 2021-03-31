import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
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

/**
 * * 리스트에 출력되는 컨텐츠들을 그리드 모양으로 만든다
 * @param photo : 리스트 
 */
function PhotoGrid(photo: any) {
  const classes = useStyles();

  /**
   * * map 반복문을 돌려서 <Grid> 하나하나 만드는 메소드
   * @param p : 리스트 i번째 객체, pLength : 리스트 길이, index : 인덱스
   */
  const GirdLists = (p: any, pLength: number, index: number) => {
    let num: any = 0;
    let height: any = "300px";

    // 그리드 간격 정하기
    // num = Grid 간격
    // 12
    // 6 6
    // 4 4 4
    if (pLength == 1) {
      num = 12;
    } else if (pLength == 2) {
      num = 6;
    } else if (pLength == 3) {
      height = "150px";
      if (index == 0) {
        num = 12;
      } else {
        num = 6;
      }
    } else {
      height = "150px";
      if (index == 0) {
        // 첫번째 인덱스일땐 12
        num = 12;
      } else {
        num = 4;
      }
    }

    // 그리드 모양 만들기
    if (index === 3 && photo.fileLength != 4) {
      return (
        <Grid item xs={num}>
          <div style={{ opacity: "0.7", position: "absolute", backgroundColor: "gray", color: "white", width: "125px", height: "150px", fontSize: "20pt" }}>
            <div style={{ padding: "25%" }}>+ {photo.fileLength - 4}</div>
          </div>
          <img
            src={p.thumbPath}
            height={height}
            width='100%'
            alt=''
          />
        </Grid>
      )
    } else {
      if (p.fileKinds === "MEDIA") {
        if (p.mediaType === "IMG") {
          return (
            <Grid item xs={num}>
              <img
                src={p.thumbPath}
                height={height}
                width='100%'
                alt=''
              />
            </Grid>
          )
        } else if (p.mediaType === 'VIDEO') {
          return (
            <Grid item xs={num}>
              <img height={height} width='100%' src='/image/default/video_default.png'></img>
            </Grid>
          )
        } else {
          return (
            <Grid item xs={num}>
              <img height={height} width='100%' src='/image/default/audio_default.png'></img>
            </Grid>
          )
        }
      } else {
        return (
          <Grid item xs={num}>
            <img height={height} width='100%' src='/image/default/file_default.png'></img>
          </Grid>
        )
      }

    }
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={1}>
          {!!photo.data && photo.data.map((p: any, index: number) => GirdLists(p, photo.data.length, index))}
        </Grid>
      </div>
    </>
  );
}

export default PhotoGrid;
