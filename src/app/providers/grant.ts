import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API } from '../../config';

@Injectable({providedIn: 'root'})
export class GrantProvider {
    constructor(private auth: HttpClient) {
    }

    checkAuth(menu_id, article_no, type) {
        return this.auth.get(`${API}/auth/check?menu=${menu_id}&id=${article_no}`).toPromise()
        .then((data:any) => {
            if(!data && data.length == 0 || data[0].result == 'X') {
                alert('권한이 없습니다.');
                return false;
            }
            else if(data[0].result == 'A')
                return true;
            else if(type == 'edit' && data[0].result == 'U')
                return true;
            else if(type == 'delete' && data[0].result == 'D')
                return true;
            else {
                alert('권한이 없습니다.');
                return false;
            }
        })
        .catch(() => {
            alert('권한정보 에러');
        });
    }

    get(menu, id) {
        return this.auth.get(`${API}/auth/grant?menu=${menu}&id=${id}`);
    }

    post(menu, id, grantee) {
        return this.auth.post(`${API}/auth/grant`, {menu: menu, id: id, grantee: grantee}, {responseType:'text'});
    }

    delete(menu, id, grantee) {
        return this.auth.delete(`${API}/auth/grant?menu=${menu}&id=${id}&grantee=${grantee}`, {responseType:'text'});
    }
}