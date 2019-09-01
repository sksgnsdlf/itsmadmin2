import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API, UserSearchForm } from '../../../../../config';
import { ResponseContentType } from '@angular/http';

export class Common {
    private resource: string = this.root_resource + "/common";

    constructor(private auth: HttpClient, private root_resource) { }

    get(post_no, society_no) {
        return this.auth.get(`${API}${this.resource}/${post_no}?society_no=${society_no}`);
    }

    post(params) {
        return this.auth.post(`${API}${this.resource}`, params, {responseType:'text'});
    }

    delete(post_no, post_div) {
        return this.auth.delete(`${API}${this.resource}?post_no=${post_no}&post_div=${post_div}`, {responseType:'text'});
    }
}
