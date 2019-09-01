import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API, UserSearchForm } from '../../../../../config';
import { ResponseContentType } from '@angular/http';

export class MemberCls {
    private resource: string = this.root_resource + "/open";

    constructor(private auth: HttpClient, private root_resource) { }

    get(post_no) {
        return this.auth.get(`${API}${this.resource}?post_no=${post_no}`);
    }

    post(params) {
        return this.auth.post(`${API}${this.resource}`, params, { responseType: 'text' });
    }

    delete(post_no, mbr_type) {
        return this.auth.delete(`${API}${this.resource}?post_no=${post_no}&mbr_type=${mbr_type}`, { responseType: 'text' });
    }

    surveyGet(survey_no) {
        return this.auth.get(`${API}${this.resource + '/survey'}?survey_no=${survey_no}`);
    }

    surveypost(params) {
        return this.auth.post(`${API}${this.resource + '/survey'}`, params, { responseType: 'text' });
    }

    surveydelete(survey_no, mbr_type) {
        return this.auth.delete(`${API}${this.resource + '/survey'}?survey_no=${survey_no}&mbr_type=${mbr_type}`, { responseType: 'text' });
    }

}