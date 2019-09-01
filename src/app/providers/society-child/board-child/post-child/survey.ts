import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API, UserSearchForm } from '../../../../../config';
import { ResponseContentType } from '@angular/http';

export class Survey {
    private resource: string = this.root_resource + "/survey";
    constructor(private auth: HttpClient, private root_resource) { }
    getSurveyOption() {
        return this.auth.get(`${API}${this.resource}/option`);
    }
    getSurveyList(search) {
        return this.auth.get(`${API}${this.resource}?survey_no=${search.survey_no}&society_no=${search.society_no}&state=${search.state}&searchType=${search.searchType}&searchTxt=${search.searchTxt}&fromDt=${search.fromDt}&toDt=${search.toDt}&pageIndex=${search.pageIndex}&pageSize=${search.pageSize}`);
    }
    getSurveyResult(survey_no, society_no = null) {
        return this.auth.get(`${API}${this.resource}/result?survey_no=${survey_no}&society_no=${society_no}`)
    }
    getSurveyResultExcel(survey_no) {
        return this.auth.get(`${API}${this.resource}/result?survey_no=${survey_no}&excel=true`, {
            responseType: 'blob'
        });
    }

    get(survey_no) {
        return this.auth.get(`${API}${this.resource}/${survey_no}`);
    }

    getOptions(society_no) {
        return this.auth.get(`${API}${this.resource}/option?society_no=${society_no}`);
    }

    post(params) {
        return this.auth.post(`${API}${this.resource}`, params, { responseType: 'text' });
    }

    delete(survey_no) {
        return this.auth.delete(`${API}${this.resource}?survey_no=${survey_no}`, { responseType: 'text' });
    }
}