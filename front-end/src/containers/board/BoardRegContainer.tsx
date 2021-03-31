import React, { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardRegisterForm from "../../components/board/BoardRegFormComponent";
import * as api from "../../lib/api";
import { withRouter } from "react-router-dom";
import { fetchCateList, addAttach, addBigAttach } from "../../modules/boardSaga";

//import { addAttach, addBigAttach } from "../../modules/board";

const BoardRegisterContainer = () => {
  const dispatch = useDispatch();

  const { attachments, categorys } = useSelector(({ board }: any) => ({
    attachments: board.attachments,
    categorys: board.categorys
  }));

  /***
   * 처음 실행됐을 때
   */
  useEffect(() => {
    dispatch(fetchCateList()); // 카테고리 리스트 액션 실행
  }, []);



  /**
   * board db에 저장
   */
  const onRegister = async (title: string, category: string,
    tag: any) => {
    const response = await api.write(title, category, tag);

    return response;
  };



  /**
   * 일반파일저장
   */
  const onAddAttach = async (file: File, bNo: string, fileLevel: number, fileSize: number) => {
    let formData = new FormData()
    formData.append("file", file)
    formData.append("bNo", bNo)
    formData.append("fileLevel", String(fileLevel))
    formData.append('size', String(fileSize));
    const response = await api.addAttach(formData);
    const attach = response.data;

    dispatch(addAttach(attach));
  };

  /**
   * 대용량 파일 저장
   */
  const onAddBigAttach = async (list: Array<any>, bigFileLength: number) => {
    const response = await api.addBigAttach(list, bigFileLength);
    const attach = response;
    dispatch(addBigAttach(attach));
  };


  return (
    <BoardRegisterForm
      attachments={attachments}
      onRegister={onRegister}
      onAddAttach={onAddAttach}
      onAddBigAttach={onAddBigAttach}
      categorys={categorys}
    />
  );
};

export default withRouter(BoardRegisterContainer);
