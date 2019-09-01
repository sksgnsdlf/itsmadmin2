import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API, UserSearchForm } from '../../../../config';
import { ResponseContentType } from '@angular/http';

export class Qna {
    private resource: string = this.root_resource + "/qna";

    constructor(private auth: HttpClient, private root_resource) { }

    get(search) {
        return this.auth.get(`${API}${this.resource}?society_no=${search.society_no}&board_tab=${search.board_tab}&searchType=${search.searchType}&searchTxt=${search.searchTxt}&fromDt=${search.fromDt}&toDt=${search.toDt}&ans_yn=${search.ans_yn}&pageIndex=${search.pageIndex}&pageSize=${search.pageSize}`);
    }

    getOption(society_no) {
        return this.auth.get(`${API}${this.resource}/option?society_no=${society_no}`);
    }

    getDetail(qa_no, post_no) {
        return this.auth.get(`${API}${this.resource}/detail?qa_no=${qa_no}&post_no=${post_no}`);
    }
    post(body){
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }
    delete(data){
        return this.auth.delete(`${API}${this.resource}?qa_no=${data.qa_no}&cmnt_no=${data.cmnt_no}`, {responseType:'text'});
    }
    deleteQuestion(data){
        return this.auth.delete(`${API}${this.resource}/question?qa_no=${data.qa_no}&cmnt_no=${data.cmnt_no}`, {responseType:'text'});
    }
}