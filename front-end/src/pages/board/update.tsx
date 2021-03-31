import React from "react";
import { RouteComponentProps } from "react-router-dom";
import BoardUpdateContainer from "../../containers/board/BoardUpdateContainer";
import MainLayout from "../../layout/MainLayout";

interface MatchParams {
    bNo: string
}

function BoardUpdatePage({ match }: RouteComponentProps<MatchParams>) {
    const { bNo } = match.params;
    return (
        <MainLayout>
            <BoardUpdateContainer bNo={bNo} />
        </MainLayout>
    );
}

export default BoardUpdatePage;
