import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API } from '../../config';

@Injectable({providedIn: 'root'})
export class UserProvider {
    private resource: string = '/user';
    business: Business = new Business(this.auth);

    constructor(private auth: HttpClient) { }

    getAll(type: number, org: number, user_nm = "", task_nm = "", partner_nm = "") {
        return this.auth.get(`${API}/department${this.resource}s/all/${type}/${org}?user_nm=${user_nm}&q=${user_nm}&task_nm=${task_nm}&partner_nm=${partner_nm}`);
    }
}

export class Business {
    private resource: string = '/user/business';

    constructor(private auth: HttpClient) { }

    getPartner(search: string = "") {
        return this.auth.get(`${API}${this.resource}_partner?search=${search}`);
    }
}