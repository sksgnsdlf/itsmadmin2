import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API, UserSearchForm } from '../../../../config';
import { ResponseContentType } from '@angular/http';
import { Common } from './post-child/common';
import { Beacon } from './post-child/beacon';
import { Appl } from './post-child/appl';
import { MemberCls } from './post-child/open';
import { Lecture } from './post-child/lecture';
import { Survey } from './post-child/survey';
import { Event } from './post-child/event';
import { Bill } from './post-child/bill';
import { Attend } from './post-child/attend';
import { CS } from './post-child/cs';

export class Post {
    private resource: string = this.root_resource + "/post";

    public common: Common = new Common(this.auth, this.resource);
    public event: Event = new Event(this.auth, this.resource);
    public beacon: Beacon = new Beacon(this.auth, this.resource);
    public appl: Appl = new Appl(this.auth, this.resource);
    public mbrCls: MemberCls = new MemberCls(this.auth, this.resource);
    public lecture: Lecture = new Lecture(this.auth, this.resource);
    public survey: Survey = new Survey(this.auth, this.resource);
    public bill: Bill = new Bill(this.auth, this.resource);
    public attend: Attend = new Attend(this.auth, this.resource);
    public cs: CS = new CS(this.auth, this.resource);


    constructor(private auth: HttpClient, private root_resource) { }
    get(board_tab = null, society_no = null, board_typ = null, pageIndex = 0, pageSize = 10, searchForm: any = {}) {
        return this.auth.get(`${API}${this.resource}?pageIndex=${pageIndex}&pageSize=${pageSize}&society_no=${society_no}&board_tab=${board_tab}&board_typ=${board_typ}&searchType=${searchForm.searchType}&searchTxt=${searchForm.searchTxt}&post_state=${searchForm.post_state}`);
    }
    getOptions(society_no) {
        return this.auth.get(`${API}${this.resource}/options?society_no=${society_no}`);
    }
    getboardOptions() {
        return this.auth.get(`${API}${this.resource}/boardOptions`);
    }
    getApplPost(search) {
        return this.auth.get(`${API}${this.resource}/appl?society_no=${search.society_no}&searchType=${search.searchType}&searchTxt=${search.searchTxt}&board_tab=${search.board_tab}&fromDt=${search.fromDt}&toDt=${search.toDt}&post_state=${search.post_state}&state=${search.state}&post_no=${search.post_no}&pageIndex=${search.pageIndex}&pageSize=${search.pageSize}`)
    }
    getApplOption(society_no = null, post_no = null) {
        return this.auth.get(`${API}${this.resource}/appl/option?society_no=${society_no}&post_no=${post_no}`);
    }
    getApplUser(search) {
        return this.auth.get(`${API}${this.resource}/appl/user?post_no=${search.post_no}&searchType=${search.searchType}&searchValue=${search.searchValue}&fromDt=${search.fromDt}&toDt=${search.toDt}&nameOrTel=${search.nameOrTel}&pageIndex=${search.pageIndex}&pageSize=${search.pageSize}`);
    }
    putAppl(body) {
        return this.auth.put(`${API}${this.resource}/appl`, body, { responseType: 'text' });
    }
    postApplUser(body) {
        return this.auth.post(`${API}${this.resource}/appl/user`, body, { responseType: 'text' });
    }
    deleteApplUser(appl_no) {
        return this.auth.delete(`${API}${this.resource}/appl/user?appl_no=${appl_no}`, { responseType: 'text' });
    }
    getApplUserExcel(post_no) {
        return this.auth.get(`${API}${this.resource}/appl/excel?post_no=${post_no}`, {
            responseType: 'blob'
        });
    }
    filedelete(post_no, add_seq, add_file_url) {
        return this.auth.delete(`${API}${this.resource}/file?post_no=${post_no}&add_seq=${add_seq}&add_file_url=${add_file_url}`, { responseType: 'text' });
    }
    getCls(){
        return this.auth.get(`${API}${this.resource}/cls`);
    }
    postCls(body){
        return this.auth.post(`${API}${this.resource}/cls`, body, { responseType: 'text' });
    }
    subjDupCheck(subj, no, society_no, board_tab, board_typ){
        if(board_typ < '5')
            return this.auth.get(`${API}${this.resource}/dup?subj=${subj}&society_no=${society_no}&board_tab=${board_tab}&post_no=${no}&board_typ=${board_typ}`, {responseType:'text'});
        else if(board_typ == '5')
            return this.auth.get(`${API}${this.resource}/dup?survey_subj=${subj}&society_no=${society_no}&board_tab=${board_tab}&survey_no=${no}&board_typ=${board_typ}`, {responseType:'text'});
        else if(board_typ == '6')
            return this.auth.get(`${API}${this.resource}/dup?subj=${subj}&society_no=${society_no}&board_tab=${board_tab}&prod_no=${no}&board_typ=${board_typ}`, {responseType:'text'});
        else if(board_typ == '7')
            return this.auth.get(`${API}${this.resource}/dup?room_nm=${subj}&society_no=${society_no}&board_tab=${board_tab}&room_no=${no}&board_typ=${board_typ}`, {responseType:'text'});
    }
}