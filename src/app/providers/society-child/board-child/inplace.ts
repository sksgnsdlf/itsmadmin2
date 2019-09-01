import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API, UserSearchForm } from '../../../../config';
import { ResponseContentType } from '@angular/http';

export class Inplace {
    private resource: string = this.root_resource + "/inplace";
    constructor(private auth : HttpClient, private root_resource){}
    getInplaceOption(society_no){
        return this.auth.get(`${API}${this.resource}/option?society_no=${society_no}`);
    }
    getInplaceList(search){
        return this.auth.get(`${API}${this.resource}/rsrv?society_no=${search.society_no}&state=${search.state}&nmOrTel=${search.nmOrTel}&fromDt=${search.fromDt}&toDt=${search.toDt}&pageIndex=${search.pageIndex}&pageSize=${search.pageSize}`);
    }
    postInplace(body){
        return this.auth.post(`${API}${this.resource}/rsrv`, body, {responseType:'text'});
    }
    deleteInplace(rsrv_no){
        return this.auth.delete(`${API}${this.resource}/rsrv?rsrv_no=${rsrv_no}`, {responseType:'text'});
    }

    get(room_no) {
        return this.auth.get(`${API}${this.resource}/${room_no}`);
    }

    post(params) {
        return this.auth.post(`${API}${this.resource}`, params, {responseType:'text'});
    }

    delete(room_no) {
        return this.auth.delete(`${API}${this.resource}?room_no=${room_no}`, {responseType:'text'});
    }
}