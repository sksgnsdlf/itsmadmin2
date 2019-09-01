import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { API } from '../../../../config';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { LoginSession } from '../../../services/login.session';
import { MaxPageSize} from '../../../../config';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  orgList: Array<any> = [];
  auths: Array<any> = [];
  authSearch: string = '';

  page: number = 1;
  pageIndex: number = 1;
  pageSize: number = 5;
  total: number = 0;
  totalPage: number = 0;
  collectionSize: number = 5;
  maxPageSize = MaxPageSize;

  offList: Array<any> = [];

  authMember: Array<any> = [];
  deleteMember: Array<any> = [];

  userNmSearch: string = '';
  userLoginSearch: string = '';
  userDept: string = '';

  selectedAuth = { auth_nm: '', auth_cd: '' };
  selectedOrgId: number = -1;

  constructor(private resource: ResourceService, private http: HttpClient, public session: LoginSession) { }

  ngOnInit() {
    this.getOrg();
  }

  getOrg() {
    this.resource.getOrg(4)
      .then((_: any) => {
        this.orgList = _;
        this.selectedOrgId = this.session.checkAdminAndGetOrg() == -1 ? 1 : this.session.checkAdminAndGetOrg();
        this.getOffical(1);
      })
      .catch(
        err => {
          console.error(err);
        }
      );
  }


  getOffical(page = this.pageIndex) {

    let url = `${API}/auth/users?offset=${(page - 1) * this.pageSize}&limit=${this.pageSize}`;

    if (this.userNmSearch)
      url += `&user_nm=${this.userNmSearch}`;

    // if (this.userLoginSearch)
    //   url += `&login_accnt=${this.userLoginSearch}`;

    if (this.userDept)
      url += `&dept_nm=${this.userDept}`;

    if (this.selectedOrgId != -1)
      url += `&org=${this.selectedOrgId}`;


    this.http.get(url)
      .subscribe((_: any) => {
        this.total = _.total;
        this.offList = _.list;
        this.offList.forEach(element => { element.new = true; element.selected = false });
        this.totalPage = Math.ceil(this.total / this.pageSize);
        this.collectionSize = this.totalPage * this.pageSize;
      });
  }

  getAuthMemeber(item) {

    this.selectedAuth = item;
    let url = `${API}/auth/match/${item.auth_cd}`;

    this.http.get(url)
      .subscribe((_: any) => {
        this.authMember = _;
        this.authMember.forEach(element => { element.new = false; element.selected = false });
      });
  }

  add() {
    if (!this.selectedAuth || !this.selectedAuth.auth_cd) {
      alert('권한을 선택해 주세요');
      return;
    }
    if (this.offList.filter(_ => _.selected).length <= 0) {
      alert('상단에서 추가할 회원을 선택 해 주세요');
      return 0;
    }
    this.authMember.push(..._.cloneDeep(this.offList.filter(_ => _.selected)));
    this.authMember = _.uniqBy(this.authMember, 'user_no');

    var bodySave = {
      auth_cd: this.selectedAuth.auth_cd,
      user_no: ''
    };

    var savePromise = [];

    this.authMember.forEach(element => {
      bodySave.user_no = element.user_no;
      savePromise.push(this.http.post(`${API}/auth/match`, bodySave, {responseType:'text'}).toPromise());
    });

    Promise.all(savePromise);
  }

  remove() {
    if (!this.selectedAuth || !this.selectedAuth.auth_cd) {
      alert('권한을 선택해 주세요');
      return;
    }
    if (this.authMember.filter(_ => _.selected).length <= 0) {
      alert('하단에서 삭제할할 회원을 선택 해 주세요');
      return 0;
    }
    
    this.deleteMember.push(..._.cloneDeep(this.authMember.filter(_ => _.selected)));
    _.remove(this.authMember, _ => _.selected);

    var deletePromise = [];

    this.deleteMember.forEach(member => {
      if (!member.new) {
        deletePromise.push(this.http.delete(`${API}/auth/match/?auth_cd=${this.selectedAuth.auth_cd}&user_no=${member.user_no}`, {responseType:'text'}).toPromise());
      }
    });

    Promise.all(deletePromise)
  }
}
