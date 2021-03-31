import { delay } from "redux-saga/effects";
import { isThisTypeNode } from "typescript";
import { client, CancelToken } from "./client";
import fileDown from 'js-file-download'

export const signIn = (userId: string, password: string) => client.post(`/api/authenticate?username=${userId}&password=${password}`);
export const getMyInfo = () => client.get("/api/users/myinfo");

export const categoryList = () => client.get("/api/category/list");

export const addAttach = async (formData: any) => await client.post('/api/board/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
});


const source = CancelToken.source();

/**
 *  대용량 파일 첨부
 * @param title 
 * @param category 
 * @param tag 
 */
export const addBigAttach = async (list: Array<any>, bigFileLength: number) => {
  let result;

  // 랜덤 제목 초기값
  let newName: string = Math.random().toString(36).substr(2, 11);
  let flag: boolean = false;

  for (let i: number = 0; i < list.length; i++) {
    // 파일레벨이 변경될 때 마다(다른 파일이 전송됐을 때) 제목 바뀜
    if (i != 0 && list[i].fileLevel != list[i - 1].fileLevel) {
      newName = Math.random().toString(36).substr(2, 11);
    }
    // 마지막일 때
    if ((i != list.length - 1
      && list[i].fileLevel != list[i + 1].fileLevel)) {
      flag = true;
    } else {
      flag = false;
    }

    if (i == list.length - 1) {
      flag = true;
    }

    let fileName = list[i].fileName;
    let bNo = String(list[i].bNo);
    let fileLevel = list[i].fileLevel;
    let numberOfSlices = list[i].numberOfSlices;
    let bigFile = list[i].file;
    let size = list[i].size;

    await client.post('/api/board/bigFileUpload', bigFile,
      {
        params: {
          fileName,
          bNo,
          fileLevel,
          numberOfSlices,
          newName,
          flag,
          size
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }).then((res) => {
        result = res
      }).catch((e) => {
        console.log(e);
      });
  }

  let arr = [];
  for (let i = 0; i < bigFileLength; i++) {
    arr.push(result)
  }

  return arr
}

/**
 *  파일 첨부
 * @param title 
 * @param category 
 * @param tag 
 */
export const write = (title: string, category: string, tag: any) =>
  client.post("/api/board/write", null,
    {
      params: {
        title: title,
        category: category,
        tag: tag.join(",")
      }
    }).then((res) => {
      return res.data.result
    }).catch((e) => {
      console.log(e);
    });

//  업데이트
export const update = (bNo: number, title: string, category: string, tag: string[], file: number[]) =>
  client.put(`/api/board/update/${bNo}`, null, {
    params: {
      title: title,
      category: category,
      tag: tag.join(","),
      file: file.join(",")
    }
  })


export const fetchBoard = (bNo: number) => client.get(`/api/board/detail/${bNo}`);

export const fetchBoardList = (page: number) => client.get("/api/board/list", {
  params: {
    page: page
  }
});


// export const fetchBoardMoreList = (page : number,search:string) => client.get("/api/board/list",{
//   params : {
//     page : page,
//     search: search
//   }
// });

interface search {
  page?: number,
  category?: string,
  strDate?: string,
  endDate?: string
  tagList?: string,
  condition?: string,
  keyword?: string,
  order?: string,
}

/***
 * 페이징
 */
export const fetchBoardMoreList = (param: search) => client.get("/api/board/list", {
  params: {
    page: param.page,
    category: param.category,
    strDate: param.strDate,
    endDate: param.endDate,
    tagList: param.tagList,
    condition: param.condition,
    keyword: param.keyword,
    order: param.order
  }
});

/***
 * 검색
 */
export const fetchBoardSearchList = (searchParam: search) => client.get("/api/board/list", {
  params: {
    category: searchParam.category,
    strDate: searchParam.strDate,
    endDate: searchParam.endDate,
    tagList: searchParam.tagList,
    condition: searchParam.condition,
    keyword: searchParam.keyword,
    order: searchParam.order,
  }
});

/***
 * 태그 리스트
 */
export const tagList = () => client.get("/api/tag/list");

/***
 * 전체 페이지
 */
export const totalPage = (searchParam: search) => client.get("/api/board/totalPage", {
  params: {
    category: searchParam.category,
    strDate: searchParam.strDate,
    endDate: searchParam.endDate,
    tagList: searchParam.tagList,
    condition: searchParam.condition,
    keyword: searchParam.keyword
  }
});

export const allPage = async () => await client.get("/api/board/totalPage");

/***
 * 파일 다운로드
 */
export const fileDownload = (fileNo: number, originName: string) => client.get(`/api/board/download/${fileNo}`, {
  responseType: 'blob',
  headers: {
    'Content-Type': 'application/json',
  },
}).then((res) => {
  fileDown(res.data, originName);
}).catch((e) => {
  console.log(e);
});

/***
 * 태그 리스트
 */
export const tag = (bNo: number) => client.get(`/api/board/tag/${bNo}`);



/***
 * 삭제
 */
export const boardDelete = (bNo: string) => client.delete(`/api/board/${bNo}`)

