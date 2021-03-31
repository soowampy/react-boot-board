/**
 * React
 */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
/**
 * component
 */
import BoardSearch from "../../components/board/BoardSearchComponent";
import BoardList from "../../components/board/BoardListComponent";

/**
 * module : saga, cookie, api
 */
import board, { fetchList, FETCH_LIST, tagList, TAG_LIST, fetchCateList, FETCH_CATE_LIST, fetchMoreList, FETCH_MORE_LIST, FETCH_SEARCH_LIST, fetchSearchList, fetchOne, getTotalPage } from "../../modules/boardSaga";
import Cookies from "js-cookie";
import * as api from "../../lib/api";


const savedToken = Cookies.get("accessToken");
let cpage = 1;
let searchCate: string;
let searchStrDate: string;
let searchEndDate: string;
let searchTagList: string;
let searchCondition: string;
let searchKeyword: string;
let searchOrder: string;
let totalPage = 0;
const BoardListContainer = () => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState(false);

    // useSelector : 리덕스 보관소에 저장된 것들 가져온다
    // 가져와서 변수로 선언 하기
    let { tag, categorys, boards, apiPage, all, moreBoards, searchBoards, boardDetail, isCateLoading, isListLoading, isSearchLoading, isMoreListLoading, isTagLoading, myInfo, }: any = useSelector(({ board, loading, auth }: any) => ({
        tag: board.tag, // 태그목록
        categorys: board.categorys, //카테고리목록
        boards: board.boards, //게시글 목록
        apiPage: board.totalPage, //총페이지
        moreBoards: board.moreBoards, // 추가 페이지(페이징됐을때 다음페이지에있는 목록)
        all: board, // 전체
        searchBoards: board.searchBoards, // 검색목록
        boardDetail: board.board, // 상세보기
        isCateLoading: loading[FETCH_CATE_LIST],
        isListLoading: loading[FETCH_LIST],
        isSearchLoading: loading[FETCH_SEARCH_LIST],
        isMoreListLoading: loading[FETCH_MORE_LIST],
        isTagLoading: loading[TAG_LIST],
        myInfo: auth.myInfo,
    }));

    // 검색 정보
    let searchParam: search = {};

    /***
     * 처음 실행됐을 때
     */
    useEffect(() => {
        console.log("처음 실행");
        // 페이지전체정보 알아내는거
        pageList(searchParam);

        // 무한 페이징을 위한 스크롤 위치 알아내기
        window.addEventListener("scroll", handleScroll);

        // dispatch : 액션 실행 함수
        dispatch(fetchCateList()); // 카테고리 리스트 액션 실행
        dispatch(tagList()); // 태그 리스트 액션 실행
        dispatch(fetchList(1)); // 

        // 저장된 토큰이 없으면(권한이없으면) return
        if (savedToken == null) {
            document.location.href = "/";
        }

    }, []);


    /***
     * 전체 페이지 리스트
     */

    const pageList = async (searchParam: search) => {
        console.log("전체 페이지 리스트 세팅")
        const response = await api.totalPage(searchParam);
        totalPage = parseInt(response.data.result);
        cpage = 1;
        window.addEventListener("scroll", handleScroll);
        dispatch(getTotalPage(searchParam));
    }


    interface search {
        page?: number,
        category?: string,
        tagList?: string,
        strDate?: string,
        endDate?: string,
        condition?: string,
        keyword?: string,
        order?: string
    }

    // 페이징 위치를 알아내서 끝에 도달하면 현재 페이지 페이지 +1
    const handleScroll = useCallback(async () => {
        console.log("핸들러 이벤트")
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        console.log(cpage);
        console.log(totalPage);
        console.log("searchCate : " + searchCate)

        if ((scrollTop + clientHeight) >= scrollHeight && !isMoreListLoading && !isListLoading && !isSearchLoading) {
            if (cpage <= Math.ceil(totalPage / 12)) {
                cpage++;
            }

            if (cpage != 1 && cpage <= Math.ceil(totalPage / 12)) {

                const searchParam: search =
                {
                    page: cpage,
                    category: searchCate,
                    tagList: searchTagList,
                    strDate: searchStrDate,
                    endDate: searchEndDate,
                    condition: searchCondition,
                    keyword: searchKeyword,
                    order: searchOrder
                }

                //dispatch(fetchMoreList(cpage, searchCate));
                dispatch(await fetchMoreList(searchParam));
            }
        }
    }, [search])

    // moreBoards 상태가 변했을 때 : boards에 moreboards 불러온거 push 해서 밑에 더 나오게함
    useEffect(() => {
        console.log("페이징ㅇ 추가 이벤트");
        moreBoards.map((b: any) => {
            boards.push(b)
        })
    }, [moreBoards])


    /***
    * 검색
    */

    const onSearch = useCallback(async (category: string, selectTagList: [], startDate: string, endDate: string, condition: string, keyword: string, order: string) => {
        console.log("검색 이벤트")
        window.removeEventListener("scroll", handleScroll);
        cpage = 1;
        // 카테고리
        if (category !== "") {
            searchParam.category = category;
            searchCate = category;
        }

        // 태그리스트
        if (selectTagList.length !== 0) {
            searchParam.tagList = selectTagList.join(",")
            searchTagList = selectTagList.join(",")
        } else {
            searchParam.tagList = "";
            searchTagList = "";
        }

        // 등록날짜
        if (startDate !== "" && endDate !== "") {
            searchParam.strDate = startDate;
            searchParam.endDate = endDate;
            searchStrDate = startDate;
            searchEndDate = endDate;
        }

        if (order !== "" && order != "") {
            searchParam.order = order;
            searchOrder = order;
        }

        // 검색어
        searchParam.condition = condition;
        searchCondition = condition;
        searchParam.keyword = keyword;
        searchKeyword = keyword;

        //await pageList(searchParam);
        dispatch(fetchSearchList(searchParam));
        pageList(searchParam);
        setSearch(true);
        //        cpage = 1;
    }, [search]);


    useEffect(() => {
        console.log("검색 내용 변경 이벤트")
        boards.length = 0;
        searchBoards.map((b: any) => {
            boards.push(b)
        })
    }, [searchBoards])


    /***
     * 상세보기
     */
    const onDetail = useCallback((bNo: number) => {
        dispatch(fetchOne(bNo));
    }, [])


    return (
        <div>
            <BoardSearch
                categorys={categorys}
                tag={tag}
                onSearch={onSearch}
                isLoading={isCateLoading}
                isTagLoading={isTagLoading}
                totalPage={apiPage}
            />
            <BoardList
                boards={boards}
                board={boardDetail}
                onDetail={onDetail}
                isLoading={isListLoading}
                isSearchLoading={isSearchLoading}
                isMoreLoading={isMoreListLoading}
                myInfo={myInfo}
                totalPage={apiPage}
            />
        </div>
    );
};

export default BoardListContainer;