import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API, UserSearchForm } from '../../config';
import { ResponseContentType } from '@angular/http';
import { Board } from './society-child/board';
@Injectable({ providedIn: 'root' })
export class SocietyProvider {
    private resource: string = "/society";
    public board:Board = new Board(this.auth, this.resource);
    // public boardPost:SocietyPost = new SocietyPost(this.auth);
    // public inplace:SocietyInplace = new SocietyInplace(this.auth);
    // public survey:SocietySurvey = new SocietySurvey(this.auth);
    // public bill:SocietyBill = new SocietyBill(this.auth);
    constructor(private auth: HttpClient) { }

    get(society_no = null, pageIndex = 0, pageSize = 10, userRelated = null, searchForm: any = {}) {
        return this.auth.get(`${API}${this.resource}?pageIndex=${pageIndex}&pageSize=${pageSize}&society_no=${society_no?society_no:searchForm.society_no}&userRelated=${userRelated}&district_cd=${searchForm.district_cd}&org_no=${searchForm.org_no}&society_nm=${searchForm.society_nm}&society_cls=${searchForm.society_cls}&oper_state=${searchForm.oper_state}&fromDt=${searchForm.fromDt}&toDt=${searchForm.toDt}`);
    }
    post(body) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }
    getCls(){
        return this.auth.get(`${API}${this.resource}/cls`);
    }
    getClsDept(society_cls){
        return this.auth.get(`${API}${this.resource}/deptcls?society_cls=${society_cls}`);
    }
    postClsDept(body){
        return this.auth.post(`${API}${this.resource}/deptcls`,body,{responseType:'text'});
    }
    getOptions(society_no = null) {
        return this.auth.get(`${API}${this.resource}/options?society_no=${society_no ? society_no : ''}`);
    }
    //회원이 가입한 society 목록 조회
    getSocietyUserIn(user_no) {
        return this.auth.get(`${API}${this.resource}/user/in?user_no=${user_no}`);
    }
    //회원 정보 업데이트
    putUserDetail(body) {
        return this.auth.put(`${API}${this.resource}/user`, body, {responseType:'text'});
    }
    findUser(search = null) {
        if (search) {
            return this.auth.get(`${API}${this.resource}/user?nmOrTel=${search.nmOrTel}&society_no=${search.society_no}&fromDt=${search.fromDt}&toDt=${search.toDt}&user_cls=${search.user_cls}&user_cls_cd=${search.user_cls_cd}&pageIndex=${search.pageIndex}&pageSize=${search.pageSize}`);
        } else {
            return this.auth.get(`${API}${this.resource}/user`);
        }
    }

    getMemberCls(society_no) {
        return this.auth.get(`${API}${this.resource}/mbrCls?society_no=${society_no}`);
    }
    addMemberCls(body) {
        return this.auth.post(`${API}${this.resource}/mbrCls`, body,  {responseType:'text'});
    }
    deleteMemberCls(society_no, mbr_typ) {
        return this.auth.delete(`${API}${this.resource}/mbrCls?society_no=${society_no}&mbr_typ=${mbr_typ}`,  {responseType:'text'});
    }
    getInviteForm(){
        return this.auth.get(`${API}${this.resource}/invite/form`,{
            responseType: 'blob'
        });
    }  
    getUserInfo() {
        return this.auth.get(`${API}${this.resource}/stat/userinfo`);
    }
    getStatBoard(searchForm: any = {}) {
        return this.auth.get(`${API}${this.resource}/stat/board?district_cd=${searchForm.district_cd}&society_cls=${searchForm.society_cls}`);
    }
    getStatCls(searchForm: any = {}) {
        return this.auth.get(`${API}${this.resource}/stat/cls?district_cd=${searchForm.district_cd}&society_cls=${searchForm.society_cls}`);
    }
    getStatPeriod(searchForm: any = {}) {
        return this.auth.get(`${API}${this.resource}/stat/period?district_cd=${searchForm.district_cd}&society_cls=${searchForm.society_cls}`);
    }
}