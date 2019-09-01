import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API } from '../../config';

@Injectable({providedIn: 'root'})
export class PushProvider {
    private resource: string = "/push";
    public society: Society = new Society(this.auth);
    constructor(private auth: HttpClient) { 
    }

    post(body){
        return this.auth.post(`${API}/push`, body, {responseType:'text'});
    }
    postSms(body){
        return this.auth.post(`${API}/sms`, body, {responseType:'text'});
    }
    get(id){
        return this.auth.get(`${API}/push/${id}`);
    }
    getTemplate(){
        return this.auth.get(`${API}/push/template`);
    }
    postTemplate(body){
        console.log('post template provider')
        return this.auth.post(`${API}/push/template`, body, {responseType:'text'});
    }
    deleteTemplate(id){
        return this.auth.delete(`${API}/push/template/${id}`, {responseType:'text'});
    }
}

export class Society {
    private resource: string = "/push/society";
    constructor(private auth: HttpClient){

    }
    post(body){
        return this.auth.post(`${API}/push/society`, body,  {responseType:'text'});
    }
}