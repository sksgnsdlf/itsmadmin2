import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API, UserSearchForm } from '../../../../../config';
import { ResponseContentType } from '@angular/http';

export class CS {
    private resource: string = this.root_resource + "/cs";
    constructor(private auth : HttpClient, private root_resource){}
    //만족도 조사 목록 조회
    get(search){
        return this.auth.get(`${API}${this.resource}?post_no=${search.post_no}&searchType=${search.searchType}&searchTxt=${search.searchTxt}&fromDt=${search.fromDt}&toDt=${search.toDt}&pageIndex=${search.pageIndex}&pageSize=${search.pageSize}&state=${search.state}&society_no=${search.society_no}&board_tab=${search.board_tab}`);
    }
    //해당 게시물의 만족도 조사 명단 조회
    getUser(search){
        return this.auth.get(`${API}${this.resource}/user?post_no=${search.post_no}&pageIndex=${search.pageIndex}&pageSize=${search.pageSize}`);
    }
    //해당 게시물의 만족도 조사 엑셀 저장
    getBillUserExcel(post_no){
        return this.auth.get(`${API}${this.resource}/user/excel?post_no=${post_no}`,{
            responseType: 'blob'
        });
    }
}