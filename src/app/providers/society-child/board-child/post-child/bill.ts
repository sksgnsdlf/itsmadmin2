import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API, UserSearchForm } from '../../../../../config';
import { ResponseContentType } from '@angular/http';

export class Bill {
    private resource: string = this.root_resource + "/bill";
    constructor(private auth : HttpClient, private root_resource){}
    //결제 게시물 목록 조회
    getBillPost(search){
        return this.auth.get(`${API}${this.resource}?post_no=${search.post_no}&searchType=${search.searchType}&searchTxt=${search.searchTxt}&fromDt=${search.fromDt}&toDt=${search.toDt}&pageIndex=${search.pageIndex}&pageSize=${search.pageSize}&state=${search.state}&society_no=${search.society_no}&board_tab=${search.board_tab}`);
    }
    //결제 게시물 조회 옵션 가져오기
    getBillOption(society_no){
        return this.auth.get(`${API}${this.resource}/option?society_no=${society_no}`);
    }
    //해당 게시물의 결제자 명단 조회
    getBillUser(search){
        return this.auth.get(`${API}${this.resource}/user?post_no=${search.post_no}&fromDt=${search.fromDt}&toDt=${search.toDt}&nmOrTel=${search.nmOrTel}&payment_state=${search.payment_state}&pageIndex=${search.pageIndex}&pageSize=${search.pageSize}`);
    }
    //해당 게시물의 결제자 명단 엑셀 저장
    getBillUserExcel(post_no){
        return this.auth.get(`${API}${this.resource}/user/excel?post_no=${post_no}`,{
            responseType: 'blob'
        });
    }
}