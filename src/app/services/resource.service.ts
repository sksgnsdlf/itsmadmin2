import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API } from '../../config';

@Injectable({providedIn: 'root'})
export class ResourceService {
    private routeParam = null;

    constructor(private http: HttpClient) { }

    get param() {
        let tmp = this.routeParam;
        this.routeParam = null;
        return tmp;
    }

    set param(value) {
        this.routeParam = value;
    }

    getOrg(val = 3) {
        return this.http.get(`${API}/department/tree/${val}`)
        .toPromise();
    }

    async deptTree(org = 1) {
        let tree = [];
        const dept:any = await this.getDept(org, '');
        let lvl1, lvl2;
        for (let row of dept) {
            let item: any = {
                id: row.id,
                orgNo: row.orgNo,
                name: row.name,
                selected: false,
                expanded: false,
                sub: []
            };

            if (row.lvl == 1) {
                lvl1 = tree.length;
                tree.push(item);
            } else if (row.lvl == 2) {
                lvl2 = tree[lvl1].sub.length;
                tree[lvl1].sub.push(item);
            } else {
                if (tree[lvl1].sub[lvl2])
                    tree[lvl1].sub[lvl2].sub.push(item);
                else
                    tree[lvl1].sub.push(item);
            }
        }

        return tree;
      }

    getCode(code) {
        return this.http.get(`${API}/code/${code}`)
        .toPromise();
    }

    getDept(org = 1, search = null) {
        let url = `${API}/department/all?org=${org}`;
        if (search)
            url += `&search=${search}`;
        return this.http.get(url)
        .toPromise();
    }

    getLifeInfoDept(lifeInfoNo) {
        let url = `${API}/complain/life_info_dept/${lifeInfoNo}`;
        return this.http.get(url)
        .toPromise();
    }

    postLifeInfoDept(lifeInfoNo, item) {
        return this.http.post(`${API}/complain/life_info_dept`, item, {responseType:'text'}).toPromise();
    }

    deleteLifeInfoDept(lifeInfoNo, item) {
       return this.http.delete(`${API}/complain/life_info_dept?info_no=${item.info_no}&org_no=${item.org_no}&dept_id=${item.dept_id}`, {responseType:'text'}).toPromise();
    }

    getDeptUser(dept_no, org='', app = false, search = '') {
        let url;
        if (app) {
            url = `${API}/department/users/push/${dept_no}`;
        } else {
            url = `${API}/department/users/${dept_no}?org=${org}&search=${search}`;
        }
        return this.http.get(url)
        .toPromise();
    }

    getOfficial(q) {
        return this.http.get(`${API}/user/official?search=${q}`)
        .toPromise();
    }

    getUsers(param) {
        let url = `${API}/user?`;
        if (param.name)
            url += `&name=${param.name}`;
        if (param.tel)
            url += `&tel=${param.tel}`;
        if (param.role)
            url += `&role=${param.role}`;
        if (param.fullMatch)
            url += `&full=true`;
        
        return this.http.get(url)
        .toPromise();
    }
}