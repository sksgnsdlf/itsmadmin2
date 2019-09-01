import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API, UserSearchForm } from '../../../../../config';
import { ResponseContentType } from '@angular/http';

export class Appl {
    private resource: string = this.root_resource + "/appl";

    constructor(private auth: HttpClient, private root_resource) { }

    get(post_no) {
        return this.auth.get(`${API}${this.resource}/${post_no}`);
    }

    getOptions(society_no) {
        return this.auth.get(`${API}${this.resource}/options?society_no=${society_no}`);
    }

    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }

    delete(post_no) {
        return this.auth.delete(`${API}${this.resource}?post_no=${post_no}`, {responseType:'text'});
    }
}