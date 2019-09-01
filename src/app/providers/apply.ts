import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API } from '../../config';

@Injectable({providedIn: 'root'})
export class ApplyProvider {
    private resource: string = "/apply";
    receipt: Receipt = new Receipt(this.auth);
    category: Cate = new Cate(this.auth);

    constructor(private auth: HttpClient) { 
        this.receipt = new Receipt(auth);    
    }

    get(org_no = "", appl_cls = "", from_dt: any = "", to_dt: any = "", search = "") {
        return this.auth.get(`${API}${this.resource}?org_no=${org_no}&appl_cls=${appl_cls}&from_dt=${from_dt}&to_dt=${to_dt}&search=${search}`);
    }

    getDetail(appl_no) {
        return this.auth.get(`${API}${this.resource}/detail/${appl_no}`);
    }

    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }

    delete(appl_no) {
        return this.auth.delete(`${API}${this.resource}/${appl_no}`, {responseType:'text'});
    }
}

export class Receipt {
    private resource: string = "/apply/receipt";

    constructor(private auth: HttpClient) { }

    get(appl_no, receipt_rslt, search, select_rslt, pageNo, pageSize) {
        return this.auth.get(`${API}${this.resource}?appl_no=${appl_no}&receipt_rslt=${receipt_rslt}&select_rslt=${select_rslt}&search=${search}&pageNo=${pageNo}&pageSize=${pageSize}`);
    }
    
    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }

    change(receipt_rslt, receipt_nos) {
        return this.auth.post(`${API}${this.resource}/change`, {receipt_rslt: receipt_rslt, receipt_nos: receipt_nos}, {responseType:'text'});
    }

    select(select_rslt, receipt_nos) {
        return this.auth.post(`${API}${this.resource}/select`, {select_rslt: select_rslt, receipt_nos: receipt_nos}, {responseType:'text'});
    }
}

export class Cate {
    private resource: string = "/apply/cate";

    constructor(private auth: HttpClient) { }

    get() {
        return this.auth.get(`${API}${this.resource}`);
    }

    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }

    delete(cd) {
        return this.auth.delete(`${API}${this.resource}/${cd}`, {responseType:'text'});
    }
}