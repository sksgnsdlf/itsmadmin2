import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API, UserSearchForm } from '../../config';
import { ResponseContentType } from '@angular/http';
@Injectable({ providedIn: 'root' })
export class CommonProvider {
    private resource: string = "/common";

    public code: Code = new Code(this.auth);
    public organ: Organ = new Organ(this.auth);
    public facility: Facility = new Facility(this.auth);
    public appmenu: Appmenu = new Appmenu(this.auth);
    public banner: Banner = new Banner(this.auth);
    public milage: Mileage = new Mileage(this.auth);
    public attr: Attr = new Attr(this.auth);
    public board: Board = new Board(this.auth);
    public user: User = new User(this.auth);
    public uauth: Auth = new Auth(this.auth);

    constructor(private auth: HttpClient) {
    }

    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }

    delete(complaint_no) {
        return this.auth.delete(`${API}${this.resource}?complaint_no=${complaint_no}`, {responseType:'text'});
    }
}

export class Code {
    private resource: string = "/code/all";

    constructor(private auth: HttpClient) { }

    get(level = 1, cls = 0, searchType: number = -1, search: string = "") {
        // return this.auth.get(`${API}${this.resource}/${level}`);
        return this.auth.get(`${API}${this.resource}/${level}?id=${cls}&searchType=${searchType}&search=${search}`);
    }

    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }

    delete(body) {
        return this.auth.delete(`${API}${this.resource}?id=${body.id}&code=${body.code}`, {responseType:'text'});
    }
}

export class Organ {
    private resource: string = "/organization";

    constructor(private auth: HttpClient) { }

    get(search: string = "") {
        // return this.auth.get(`${API}${this.resource}/${level}`);
        return this.auth.get(`${API}${this.resource}/?search=${search}`);
    }

    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }

    put(body) {
        return this.auth.put(`${API}${this.resource}`, body, {responseType:'text'});
    }

    delete(body) {
        return this.auth.delete(`${API}${this.resource}/${body.no}`);
    }
}

export class Facility {
    private resource: string = "/organization/facility";

    constructor(private auth: HttpClient) { }

    get(orgNo, facNo: number = -1) {
        return this.auth.get(`${API}${this.resource}/${orgNo}?facNo=${facNo}`);
    }

    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }

    put(body) {
        return this.auth.put(`${API}${this.resource}`, body, {responseType:'text'});
    }

    delete(body) {
        return this.auth.delete(`${API}${this.resource}/${body.no}`, {responseType:'text'});
    }
}

export class Appmenu {
    private resource: string = "/menu";

    constructor(private auth: HttpClient) { }

    get(menuCate, search: string = "", cls = 3, lvl = 2, use_yn = '') {
        return this.auth.get(`${API}${this.resource}/tree?menu_cate=${menuCate}&menu_nm=${search}&menu_cls=${cls}&menu_lvl=${lvl}&use_yn=${use_yn}`);
    }

    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }

    put(body) {
        return this.auth.put(`${API}${this.resource}`, body, {responseType:'text'});
    }

    delete(body) {
        return this.auth.delete(`${API}${this.resource}/${body.menu_id}`, {responseType:'text'});
    }
}

export class Banner {
    private resource: string = "/banner";

    constructor(private auth: HttpClient) { }

    get(startDt, endDt, state, pageIndex, pageSize) {
        let args: any = {
            offset: pageIndex * pageSize,
            limit: pageSize
        }
        if (startDt)
            args.from_dt = startDt;
        if (endDt)
            args.to_dt = endDt;
        if (state)
            args.post_state = state;

        return this.auth.get(`${API}${this.resource}?offset=${pageIndex * pageSize}&limit=${pageSize}&from_dt=${startDt}&to_dt=${endDt}&post_state=${state}`);
    }

    getDetail(no) {
        return this.auth.get(`${API}${this.resource}/detail/${no}`);
    }

    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }

    put(body) {
        return this.auth.put(`${API}${this.resource}`, body, {responseType:'text'});
    }

    delete(body) {
        return this.auth.delete(`${API}${this.resource}/${body.banner_no}`, {responseType:'text'});
    }
}

export class Mileage {
    private resource: string = "/mileage";

    constructor(private auth: HttpClient) { }

    get(no, search) {
        return this.auth.get(`${API}${this.resource}/?org_no=${no}&search=${search}`);
    }

    getDetail(no) {
        return this.auth.get(`${API}${this.resource}/detail/${no}`);
    }

    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }

    put(body) {
        return this.auth.put(`${API}${this.resource}`, body, {responseType:'text'});
    }

    delete(body) {
        return this.auth.delete(`${API}${this.resource}/${body.mileage_no}`, {responseType:'text'});
    }
}

export class Attr {
    private resource: string = "/user_attr";

    constructor(private auth: HttpClient) { }

    get(search = "") {
        return this.auth.get(`${API}${this.resource}/attr/?search=${search}`);
    }

    post(body) {
        return this.auth.post(`${API}${this.resource}/attr`, body, {responseType:'text'});
    }

    delete(body) {
        return this.auth.delete(`${API}${this.resource}/attr/${body.cd}`, {responseType:'text'});
    }

    getAttrUser(no, pageIndex, pageSize) {
        return this.auth.get(`${API}${this.resource}/matchlist/${no}?offset=${pageIndex * pageSize}&limit=${pageSize}`);
    }

    match(body) {
        return this.auth.post(`${API}${this.resource}/match`, body, {responseType:'text'});
    }
    matchDelete(cd, userNO) {
        return this.auth.delete(`${API}${this.resource}/match/?attr_cd=${cd}&user_no=${userNO}`, {responseType:'text'});
    }

}

export class Board {
    private resource = '/board/category';

    constructor(private auth: HttpClient) { }

    get(params) {
        return this.auth.get(`${API}${this.resource}`, { params });
    }

    post(params) {
        return this.auth.post(`${API}${this.resource}`, params, {responseType:'text'});
    }

    update(no, params) {
        return this.auth.put(`${API}${this.resource}/${no}`, params, {responseType:'text'});
    }

    delete(no) {
        return this.auth.delete(`${API}${this.resource}/${no}`, {responseType:'text'});
    }
}

export class User {
    private resource = '/user';

    constructor(private auth: HttpClient) {}

    get(queryString){
        return this.auth.get(`${API}${this.resource}${queryString}`);
    }
    syncUser(body){
        return this.auth.post(`${API}${this.resource}/sync`, body, { responseType:'text'});
    }
    syncDept(body){
        return this.auth.post(`${API}/department/sync`, body, { responseType:'text' });
    }
    getUserDetail(user_no){
        return this.auth.get(`${API}${this.resource}info/user/${user_no}`);
    }
    getOfficialDetail(official_id){
        return this.auth.get(`${API}${this.resource}info/official?official_id=${official_id}`);
    }
    getPartnerList(search){
        return this.auth.get(`${API}${this.resource}info/business_partner/list?search=${search}`);
    }
    getPartnerDetail(partner_no, search){
        return this.auth.get(`${API}${this.resource}info/business_partner/users/${partner_no}?search=${search}`);
    }
    asignPartner(body){
        return this.auth.post(`${API}${this.resource}info/business_partner/user_asign`, body, { responseType:'text' });
    }
    postPartner(body){
        return this.auth.post(`${API}${this.resource}info/business_partner`, body, { responseType : 'text' });
    }
    deletePartner(partner_no){
        return this.auth.delete(`${API}${this.resource}info/business_partner?partner_no=${partner_no}`, { responseType:'text' });
    }
    postPartnerMember(body){
        return this.auth.post(`${API}${this.resource}info/business_staff`, body, { responseType:'text' });
    }
    deletePartnerMember(staff_no){
        return this.auth.delete(`${API}${this.resource}info/business_staff/staff/${staff_no}`, { responseType:'text' });
    }
    deletePartnerMemeberAll(partner_no){
        return this.auth.delete(`${API}${this.resource}info/business_staff/partner/${partner_no}`, { responseType:'text' });
    }
    designateUser(body){
        return this.auth.post(`${API}/department/designate`, body, { responseType:'text' });
    }
}
export class Auth {
    private resource = '/auth';

    constructor(private auth: HttpClient) {}
    get(search){
        return this.auth.get(`${API}${this.resource}?search=${search}`);
    }
    getAuthMemeber(auth_cd){
        return this.auth.get(`${API}${this.resource}/match/${auth_cd}`);
    }
    postAuthMember(body){
        return this.auth.post(`${API}${this.resource}/match`, body, {responseType:'text'} );
    }
    deleteAuthMember(auth_cd, user_no){
        return this.auth.delete(`${API}${this.resource}/match/?auth_cd=${auth_cd}&user_no=${user_no}`, { responseType:'text' });
    }
}