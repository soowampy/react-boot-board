import React, { useState, useEffect, useRef, useCallback, useReducer, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardUpdateForm from "../../components/board/BoardUpdateComponent";
import { fetchOne, fetchCateList, tag } from "../../modules/boardSaga";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import * as api from "../../lib/api";

const savedToken = Cookies.get("accessToken");

const BoardUpdateContainer = (bNo: any) => {
    const dispatch = useDispatch();

    const { boardDetail, myInfo, categorys, tags } = useSelector(({ board, auth, }: any) => ({
        boardDetail: board.board, // 상세보기
        myInfo: auth.myInfo, // 내 정보
        categorys: board.categorys, //카테고리목록
        tags: board.tag,
    }));

    /**
     * 처음 실행됐을 때
     * board 정보, 카테고리정보
     */
    useEffect(() => {
        dispatch(fetchOne(parseInt(bNo.bNo)));
        dispatch(fetchCateList()); // 카테고리 리스트 액션 실행
        dispatch(tag(bNo.bNo)); // 태그
    }, [dispatch, bNo])

    /**
     * board 수정
     */
    const onUpdate = async (title: string, category: string,
        tag: string[], file: number[]) => {

        const response = await api.update(bNo.bNo, title, category, tag, file);
        document.location.href = "/board/list";
        //const response = await api.write(title, category, tag);
        //return response;
    };

    return (
        <BoardUpdateForm
            onUpdate={onUpdate}
            boardDetail={boardDetail}
            myInfo={myInfo}
            categorys={categorys}
            tags={tags}
        />
    );
};

export default BoardUpdateContainer;
