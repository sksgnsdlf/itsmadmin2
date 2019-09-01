import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API } from '../../config';

@Injectable({providedIn: 'root'})
export class OneStopProvider {
    private resource: string = "/complain";

    public category: Category = new Category(this.auth);
    public report: Report = new Report(this.auth);
    public menual: Menual = new Menual(this.auth);
    public assign: Assign = new Assign(this.auth);
    public duty: Duty = new Duty(this.auth);
    public urban: Urban = new Urban(this.auth);

    constructor(private auth: HttpClient) {

    }
    
    state(body) {
        return this.auth.post(`${API}${this.resource}/state`, body, {responseType:'text'});
    }

    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }
    putProcTxt(body){
        return this.auth.put(`${API}${this.resource}/proc_txt`, body, {responseType:'text'});
    }
    delete(complaint_no) {
        return this.auth.delete(`${API}${this.resource}?complaint_no=${complaint_no}`, {responseType:'text'});
    }
    uploadImg(body){
        return this.auth.post(`${API}/upload/complain`, body, {responseType:'text'}).toPromise();
    }
    push(body){
        return this.auth.post(`${API}/push`, body, {responseType:'text'});
    }
    //처리완료
    complete(body){
        return this.auth.post(`${API}/complain/complete`, body, {responseType:'text'});
    }
    //콜센터 상담목록 조회
    getCallList(){
        return this.auth.get(`${API}/complain/callcenter`)
    }
    //콜센터 직원인지 조회
    checkCallMem(){
        return this.auth.get(`${API}/complain/callcenter/member`);
    }

    //최초 배정인지 확인
    checkAccept(complaint_no){
        return this.auth.get(`${API}/complain/chkSendMsg/${complaint_no}`).toPromise();
    }

    getDueDate(due_day, receipt_dttm){
        return this.auth.get(`${API}/complain/due_date?due_day=${due_day}&receipt_dttm=${receipt_dttm}`,{responseType: 'text'});
    }
    
}

export class Category {
    private resource: string = "/complain/category";

    constructor(private auth: HttpClient) {

    }

    getAll(lvl) {
        return this.auth.get(`${API}${this.resource}/all/${lvl}`);
    }

    get(level, cls_no = '', search: string = "", all:boolean = false, urban:boolean = false) {
        return this.auth.get(`${API}${this.resource}/${level}?cls_no=${cls_no}&search=${search}&all=${all}&urban=${urban}`);
    }

    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }

    delete(cls_no, lvl) {
        return this.auth.delete(`${API}${this.resource}?cls_no=${cls_no}&lvl=${lvl}`);
    }

    deptGet(cls_no) {
        return this.auth.get(`${API}${this.resource}/asgn/${cls_no}`);
    }

    deptPost(body) {
        return this.auth.post(`${API}${this.resource}/asign_procdept`, body, {responseType:'text'});
    }

    deptDelete(cls_no, dvsn, org_no) {
        return this.auth.delete(`${API}${this.resource}/asign_procdept?cls_no=${cls_no}&dvsn=${dvsn}&org_no=${org_no}`);
    }

    getUser(cls_no) {
        return this.auth.get(`${API}${this.resource}/user/${cls_no}`);
    }
}

export class Report {
    private resource: string = "/complain/report";

    constructor(private auth: HttpClient) {

    }

    get(pageNo, pageSize, receipt_mthd = "", proc_state = "", from_dt: any = "", to_dt: any = "", cls_no = "", receipt_typ = "", civil_nm = "", civil_tel_no = "", complaints_txt = "", duty = "", author = "") {
        return this.auth.get(`${API}${this.resource}/${pageNo}/${pageSize}?receipt_mthd=${receipt_mthd}&proc_state=${proc_state}&from_dt=${from_dt}&to_dt=${to_dt}&cls_no=${cls_no}&receipt_typ=${receipt_typ}&civil_nm=${civil_nm}&civil_tel_no=${civil_tel_no}&complaints_txt=${complaints_txt}&duty=${duty}&author=${author}`).toPromise();
    }

    getMy(pageNo, pageSize, receipt_mthd = "", proc_state = "", from_dt: any = "", to_dt: any = "", cls_no = "", receipt_typ = "", civil_nm = "", civil_tel_no = "", complaints_txt = "", user_no = "") {
        return this.auth.get(`${API}${this.resource}/mylist/${pageNo}/${pageSize}?receipt_mthd=${receipt_mthd}&proc_state=${proc_state}&from_dt=${from_dt}&to_dt=${to_dt}&cls_no=${cls_no}&receipt_typ=${receipt_typ}&civil_nm=${civil_nm}&civil_tel_no=${civil_tel_no}&complaints_txt=${complaints_txt}&official_user_no=${user_no}`).toPromise();
    }
    getDetail(complaint_no) {
        return this.auth.get(`${API}${this.resource}/detail?complaint_no=${complaint_no}`);
    }

    excel(org_no, duty_site, duty_typ, duty_dt) {
        return this.auth.get(`${API}${this.resource}/excel?org_no=${org_no}&duty_site=${duty_site}&duty_typ=${duty_typ}&duty_dt=${duty_dt}`, {
            responseType: 'blob'
        });
    }
    print(org_no, duty_site, duty_typ, duty_dt) {
        return this.auth.get(`${API}${this.resource}/excel?org_no=${org_no}&duty_site=${duty_site}&duty_typ=${duty_typ}&duty_dt=${duty_dt}&print=true`);
    }
}

export class Assign {
    private resource: string = "/complain/hst";
    
    constructor(private auth: HttpClient) {

    }

    get(complaint_no) {
        return this.auth.get(`${API}${this.resource}/${complaint_no}`);
    }
    getMine(complaint_no, user_no) {
        return this.auth.get(`${API}/complain/asign/mine?complaint_no=${complaint_no}&asgn_user_no=${user_no}`)
    }
    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'}).toPromise();
    }
    delete(proc_hst_no) {
        return this.auth.delete(`${API}${this.resource}/${proc_hst_no}`, {responseType:'text'}).toPromise();
    }
}

export class Menual {
    private resource: string = "/complain/life_info";

    constructor(private auth: HttpClient) {

    }

    get(cls_no, search = "") {
        return this.auth.get(`${API}${this.resource}?cls_no=${cls_no}&search=${search}`);
    }

    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }

    delete(id) {
        return this.auth.delete(`${API}${this.resource}/${id}`, {responseType:'text'});
    }
}

export class Duty {
    private resource: string = "/complain/duty_order";
    
    constructor(private auth: HttpClient) {
    }

    get(org_no, duty_typ, duty_site, from_dt, to_dt) {
        return this.auth.get(`${API}${this.resource}/list?org_no=${org_no}&duty_typ=${duty_typ}&duty_site=${duty_site}&from_dt=${from_dt}&to_dt=${to_dt}`).toPromise();
    }

    getDetail(org_no, duty_typ, duty_dt, official_id) {
        return this.auth.get(`${API}${this.resource}/detail?org_no=${org_no}&duty_typ=${duty_typ}&duty_dt=${duty_dt}&official_id=${official_id}`)
    }

    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }

    delete(org_no, duty_typ, duty_dt, official_id) {
        return this.auth.delete(`${API}${this.resource}?org_no=${org_no}&duty_typ=${duty_typ}&duty_dt=${duty_dt}&official_id=${official_id}`, {responseType:'text'});
    }

    postEnd(body) {
        return this.auth.post(`${API}${this.resource}/end`, body);
    }

    postChief(body) {
        return this.auth.post(`${API}${this.resource}/chief`, body);
    }

    dupCheck(org_no, duty_dt, duty_typ) {
        return this.auth.get(`${API}${this.resource}/dub_chk?org_no=${org_no}&duty_dt=${duty_dt}&duty_typ=${duty_typ}`);
    }

    recent(user_no = "") {
        return this.auth.get(`${API}${this.resource}/mine?user_no=${user_no}`);
    }
}

export class Urban {
    private resource: string = "/complain/urban";
    
    constructor(private auth: HttpClient) {
    }
    
    get(pageNo, pageSize, from_dt: any = "", to_dt: any = "", cls_no = "", civil_nm = "", civil_tel_no = "", complaints_txt = "") {
        return this.auth.get(`${API}${this.resource}/${pageNo}/${pageSize}?from_dt=${from_dt}&to_dt=${to_dt}&cls_no=${cls_no}&civil_nm=${civil_nm}&civil_tel_no=${civil_tel_no}&complaints_txt=${complaints_txt}`).toPromise();
    }
    getCate() {
        return this.auth.get(`${API}/complain/category/0?urban=true`);
    }
    excel(from_dt: any = "", to_dt: any = "", cls_no = "", civil_nm = "", civil_tel_no = "", complaints_txt = "") {
        return this.auth.get(`${API}${this.resource}/excel?from_dt=${from_dt}&to_dt=${to_dt}&cls_no=${cls_no}&civil_nm=${civil_nm}&civil_tel_no=${civil_tel_no}&complaints_txt=${complaints_txt}`, {
            responseType: 'blob'
        });
    }
}