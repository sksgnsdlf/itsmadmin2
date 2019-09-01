import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API, UserSearchForm } from '../../../../../config';
import { ResponseContentType } from '@angular/http';

export class Attend {
    private resource: string = this.root_resource + "/attend";

    constructor(private auth: HttpClient, private root_resource) { }

    get(search = null){
        return this.auth.get(`${API}${this.resource}?society_no=${search.society_no}&searchType=${search.searchType}&searchTxt=${search.searchTxt}&fromDt=${search.fromDt}&toDt=${search.toDt}&pageIndex=${search.pageIndex}&pageSize=${search.pageSize}&lecturePageIndex=${search.lecturePageIndex}&lecturePageSize=${search.lecturePageSize}&board_typ=${search.board_typ}&post_no=${search.post_no}`);
    }
    postUser(body){
        return this.auth.post(`${API}${this.resource}/user`, body, {responseType:'text'});
    }
    getOption(){
        return this.auth.get(`${API}${this.resource}/option`);
    }
    getUser(search = null){
        return this.auth.get(`${API}${this.resource}/user?post_no=${search.post_no}&join_dttm=${search.join_dttm}&nameOrTel=${search.nameOrTel}&inOut=${search.inOut}&cls_dt=${search.cls_dt}&pageIndex=${search.pageIndex}&pageSize=${search.pageSize}`);
    }
    findUser(nameOrTel){
        return this.auth.get(`${API}${this.resource}/user/find?nameOrTel=${nameOrTel}`);
    }
    getExcel(post_no){
        return this.auth.get(`${API}${this.resource}/user/excel?post_no=${post_no}`,{
            responseType: 'blob'
        });
    }
}