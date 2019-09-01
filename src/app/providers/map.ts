import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API, UserSearchForm } from '../../config';
import { ResponseContentType } from '@angular/http';
@Injectable({ providedIn: 'root' })

export class MapProvider {
    public cls : Cls = new Cls(this.auth);
    public place : Place = new Place(this.auth);

    // public clslink : ClsLink = new ClsLink(this.auth);
    constructor(private auth: HttpClient) {
    }
}
// 분류관리
export class Cls {
    private resource: string = "/place/cls"
    constructor(private auth: HttpClient) { }

    // 조회
    getSearch(level: number  = 1, search: number = -1){
        
        let url  = `${API}${this.resource}/all/${level}`;
        if(search != -1)
            url += `?upper_cd=${search}`;
        return this.auth.get(url);
    }

    // 수정
    post(body: any) {
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'json'});
    }

    // 삭제
    delete(body) {
        return this.auth.delete(`${API}${this.resource}?cls_cd=${body.cls_cd}`, {responseType:'text'});
    }

    getOne(cls_cd){
        return this.auth.get(`${API}${this.resource}/${cls_cd}`);
    }
}

// 장소관리
export class Place {
    private resource: string = "/place"
    constructor(private auth: HttpClient) { }

    // 장소관리 - 리스트
    getlist(queryString){
        return this.auth.get(`${API}${this.resource}/list${queryString}`); //
    }

    // 장소관리 리스트 클릭시 상세항목
     get(no)
     {
         return this.auth.get(`${API}${this.resource}/${no}`); //
     }

     // 장소 등록창 - 등록+수정으로 할예정
     post(body: any){
         return this.auth.post(`${API}${this.resource}`, body, {responseType:'json'});
     }

     // 삭제
     delete(body) {
        return this.auth.delete(`${API}${this.resource}?place_no=${body.place_no}`, {responseType:'text'});
    }

    // 장소 등록/수정창 - 리스트
    getReViewlist(queryString){
        return this.auth.get(`${API}${this.resource}/review/list/${queryString}`); //
    }
}




// export class ClsLink{
//     private resource: string = "/place/cls"
//     constructor(private auth: HttpClient) { }

//     // 수정
//     clPost(body: any) {
//         return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
//     }
// }