import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API, UserSearchForm } from '../../config';
import { ResponseContentType } from '@angular/http';
@Injectable({ providedIn: 'root' })
export class ChnlProvider {
    private resource: string = "/channel";

    constructor(private auth: HttpClient) {
    }
    get(){
        return this.auth.get(`${API}${this.resource}/list`);
    }
    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }
}