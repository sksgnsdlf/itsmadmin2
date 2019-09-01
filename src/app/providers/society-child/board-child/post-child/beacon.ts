import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API, UserSearchForm } from '../../../../../config';
import { ResponseContentType } from '@angular/http';

export class Beacon {
    private resource: string = this.root_resource + "/beacon";

    constructor(private auth: HttpClient, private root_resource) { }

    getBeacons(society_no) {
        return this.auth.get(`${API}${this.resource}?society_no=${society_no}`);
    }

    post(params) {
        return this.auth.post(`${API}${this.resource}`, params, {responseType:'text'});
    }

    delete(post_no, beacon_no) {
        return this.auth.delete(`${API}${this.resource}?post_no=${post_no}&beacon_no=${beacon_no}`, {responseType:'text'});
    }
}