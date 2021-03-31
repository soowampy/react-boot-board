package com.malgn.board.domain.common;

public class Pagination {
    private static PageInfo pi = null;
    public static PageInfo getPageInfo() {
        return pi;
    }

    public static PageInfo getPageInfo(int currentPage, int listCount, int setLimit) {
        int pageLimit = 10;
        int maxPage;
        int startPage;
        int endPage;

        int boardLimit = 20;
        if(setLimit != 0){
            boardLimit = setLimit;
        }
        maxPage = (int)((double)listCount / boardLimit + 0.9);

        startPage = (((int)((double)currentPage / pageLimit + 0.9)) - 1) * pageLimit + 1;

        endPage = startPage + pageLimit - 1;

        if(maxPage < endPage) {
            endPage = maxPage;
        }

        pi = new PageInfo(currentPage, listCount, pageLimit, maxPage, startPage, endPage, boardLimit);


        return pi;
    }
}