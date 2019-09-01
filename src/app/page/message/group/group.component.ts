import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../../config';
import 'rxjs/add/operator/map';
import { ResourceService } from '../../../services/resource.service';
import { LoginSession } from '../../../services/login.session';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  name;
  nameSearch;
  telSearch;
  groupSearch: string = '';
  selectedGroup;
  role = null;

  roles = [];
  groups = [];
  members = [];
  lists = [];

  groupAll = false;
  listAll = false;

  constructor(private http: HttpClient, private resource: ResourceService, public session: LoginSession) { }

  ngOnInit() {
    this.getGroup();
    this.resource.getCode('100')
      .then((_: any) => this.roles = _);
  }

  addGroup() {
    if (this.name) {
      this.http.post(`${API}/push/group`, { name: this.name }, { responseType: 'text' })
        .subscribe(id => {
          this.groups.push({
            id: id,
            name: this.name
          });
          this.name = '';
        });
    }
  }

  getGroup() {
    this.http.get(`${API}/push/group?a=${this.session.isAdmin() ? 1 : 0}&search=${this.groupSearch}`)
      .subscribe((data: any) => {
        this.groups = data;
      });
  }

  deleteGroup(groupId) {
    this.http.delete(`${API}/push/group?id=${groupId}`, { responseType: 'text' })
      .subscribe(() => {
        this.groups.splice(
          this.groups.findIndex((el) => el.id == groupId),
          1
        );
        if (this.selectedGroup.id == groupId)
          this.selectedGroup = null;
      });
  }

  selectGroup(group) {
    this.selectedGroup = group;
    this.http.get(`${API}/push/group/${group.id}`)
      .subscribe((res: any) => {
        this.members = res;
      });
  }

  searchUser() {
    if (!this.nameSearch && !this.telSearch)
      return;
    if (this.role == 'null')
      this.role = null;

    this.resource.getUsers({ name: this.nameSearch, role: this.role, tel: this.telSearch, fullMatch: true })
      .then((res: any) => {
        this.lists = res;
      });
  }

  add() {
    if (!this.selectedGroup || !this.selectedGroup.id) {
      alert('좌측에서 푸시 그룹을 선택 해 주세요');
      return 0;
    }
    if (this.lists.filter(_ => _.selected).length <= 0) {
      alert('우측에서 추가할 회원을 선택 해 주세요');
      return 0;
    }
    this.http.post(`${API}/push/group/member/${this.selectedGroup.id}`, {
      op: "ADD",
      ids: this.lists.filter(_ => _.selected).map(_ => _.id)
    }, { responseType: 'text' })
      .subscribe((res: any) => {
        this.lists.forEach(_ => _.selected = this.listAll);
        this.selectGroup(this.selectedGroup);
      });
  }

  remove() {
    if (!this.selectedGroup || !this.selectedGroup.id) {
      alert('좌측에서 푸시 그룹을 선택 해 주세요');
      return 0;
    }
    if (this.members.filter(_ => _.selected).length <= 0) {
      alert('중앙에서 삭제할 회원을 선택 해 주세요');
      return 0;
    }
    this.http.post(`${API}/push/group/member/${this.selectedGroup.id}`, {
      op: "DELETE",
      ids: this.members.filter(_ => _.selected).map(_ => _.id)
    }, { responseType: 'text' })
      .subscribe((res: any) => {
        this.selectGroup(this.selectedGroup);
      });
  }

  groupSelectAll() {
    this.members.forEach(_ => _.selected = this.groupAll);
  }

  listSelectAll() {
    this.lists.forEach(_ => _.selected = this.listAll);
  }
}
