import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API, UserSearchForm } from '../../../../config';
import { ResponseContentType } from '@angular/http';

export class Product {
    private resource: string = this.root_resource + "/prod";

    constructor(private auth: HttpClient, private root_resource) { }

    get(prod_no) {
        return this.auth.get(`${API}${this.resource}/${prod_no}`);
    }

    post(params) {
        return this.auth.post(`${API}${this.resource}`, params, {responseType:'text'});
    }

    delete(prod_no) {
        return this.auth.delete(`${API}${this.resource}?prod_no=${prod_no}`, {responseType:'text'});
    }
}