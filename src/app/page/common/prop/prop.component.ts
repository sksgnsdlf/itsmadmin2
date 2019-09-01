import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import * as _ from 'lodash';
import { CommonProvider } from '../../../providers/common';
import { MaxPageSize} from '../../../../config';


@Component({
  selector: 'app-prop',
  templateUrl: './prop.component.html',
  styleUrls: ['./prop.component.scss']
})
export class PropComponent implements OnInit {

  attrs: Array<any> = [];
  searchAttr: string = "";
  addAttr = { cd: "", cd_nm: "", cd_txt: "" };
  seletedAttr = { cd: "", cd_nm: "", cd_txt: "" };

  attrUsers: Array<any> = [];
  attrUserSelectAll: boolean = false;

  userRole: Array<any> = [];
  selectedUserRole: number = -1;
  searchMember: string = "";
  members: Array<any> = [];
  maxPageSize = MaxPageSize;

  userPage: number = 1;
  memPage: number = 1;
  pageSize = 10;

  userPageIndex = 0;
  userTotalPage;
  userPageSize = 10;
  userTotal = 0;
  memPageIndex = 0;
  memTotal = 0;
  deleteMember: Array<any> = [];
  memSelectAll = false;


  constructor(private common: CommonProvider, private resource: ResourceService) { }

  ngOnInit() {
    this.getAttr();
    this.getUserRole();
  }

  getUserRole() {
    this.resource.getCode('100')
      .then((data: any) => {
        this.userRole = data;
      })
      .catch(err => console.error(err));
  }

  getAttr() {
    this.attrs = [];
    this.common.attr.get(this.searchAttr)
      .subscribe(
        (data: any) => {
          this.attrs = [];
          data.forEach(element => {
            this.attrs.push({
              ...element,
              id: element.cd,
              name: element.cd_nm,
            });
          });
        });
  }

  saveAttr() {
    this.common.attr.post(this.addAttr)
      .subscribe(
        (data: any) => {
          this.addAttr.cd_nm = "";
          alert('등록되었습니다.');
          this.getAttr();
        });
  }

  deleteAttr(item) {
    if (confirm('해당 속성과 연결된 회원 속성들이 모두 삭제됩니다. 그래도 삭제하시겠습니까? '))
      this.common.attr.delete(item)
        .subscribe(
          (data: any) => {
            this.getAttr();
            alert('삭제되었습니다.');
            this.seletedAttr = { cd: "", cd_nm: "", cd_txt: "" };
            this.attrUsers = [];
          });
  }

  getAttrUser(prop, page = this.userPage) {
    this.seletedAttr = prop;
    this.attrUsers = [];
    this.common.attr.getAttrUser(this.seletedAttr.cd, page - 1, this.pageSize)
      .subscribe(
        (data: any) => {
          this.attrUsers = data.list;
          this.userTotal = data.total;
          this.attrUsers.forEach(element => { element.new = false; element.selected = false });
        });
  }

  getMember(page = this.memPage) {
    let queryString = `?offset=${(page - 1) * this.pageSize}&limit=${this.pageSize}`;
    if (this.selectedUserRole != -1) queryString += `&role=${this.selectedUserRole}`;
    if (this.searchMember) queryString += `&name=${this.searchMember}`;
    this.common.user.get(queryString)
    .subscribe((_: any) => {
      this.members = _.list;
      this.members.forEach(element => { element.new = true; element.selected = false });
      this.memTotal  = _.total;
    });
  }

  selectAll(list, b) {
    list.forEach(element => {
      element.selected = b;
    });
  }

  add() {
    if (!this.seletedAttr || !this.seletedAttr.cd_nm) {
      alert('속성을 선택해 주세요');
      return 0;
    }
    if (this.members.filter(_ => _.selected).length <= 0) {
      alert('우측에서 추가할 회원을 선택 해 주세요');
      return 0;
    }
    var bodySave = {
      attr_cd: this.seletedAttr.cd,
      attr_val: this.seletedAttr.cd_nm,
      user_no: ''
    };

    this.attrUsers.push(..._.cloneDeep(this.members.filter(_ => _.selected)));
    this.attrUsers = _.uniqBy(this.attrUsers, 'id');

    var savePromise = [];

    this.attrUsers.forEach(element => {
      bodySave.user_no = element.id;
      savePromise.push(this.common.attr.match(_.cloneDeep(bodySave)).toPromise());
    });

    Promise.all(savePromise) 

  }

  remove() {
    if (!this.seletedAttr || !this.seletedAttr.cd_nm) {
      alert('속성을 선택해 주세요');
      return 0;
    }
    if (this.attrUsers.filter(_ => _.selected).length <= 0) {
      alert('중앙에서 삭제할할 회원을 선택 해 주세요');
      return 0;
    }
    var bodySave = {
      attr_cd: this.seletedAttr.cd,
      attr_val: this.seletedAttr.cd_nm,
      user_no: ''
    };

    this.deleteMember.push(..._.cloneDeep(this.attrUsers.filter(_ => _.selected)));
    _.remove(this.attrUsers, _ => _.selected);

    var deletePromise = [];

    this.deleteMember.forEach(member => {
      if (!member.new) {
        deletePromise.push(this.common.attr.matchDelete(this.seletedAttr.cd, member.id).toPromise());
      }
    });

    Promise.all(deletePromise)
  }

}

