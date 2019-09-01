import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { LoginSession } from '../../../services/login.session';
import { CommonProvider } from '../../../providers/common';
import { async } from 'q';

@Component({
  selector: 'app-official',
  templateUrl: './official.component.html',
  styleUrls: ['./official.component.scss']
})
export class OfficialComponent implements OnInit {
  members = [];
  search: string = "";
  deptId: any;
  orgId: any = 1;
  dept_nm: string = "";
  depts: any;
  orgs: any;
  constructor(private resource: ResourceService, public session: LoginSession, public common: CommonProvider) { }

  ngOnInit() {
    this.resource.getOrg(4)
    .then((_:any) => {
      this.orgs = _;
      this.setOrg();
    });
  }
  setOrg(org = this.orgId) {
    this.deptId = ''; this.members = []; this.search = '';
    this.resource.getDept(org, '')
      .then((_: any) => {
        let lvl1, lvl2;
        this.depts = [];
        for (let row of _) {
          let item: any = {
            id: row.id,
            orgNo: row.orgNo,
            name: row.name,
            selected: false,
            expanded: false,
            sub: []
          };

          if (row.lvl == 1) {
            lvl1 = this.depts.length;
            this.depts.push(item);
          } else if (row.lvl == 2) {
            lvl2 = this.depts[lvl1].sub.length;
            this.depts[lvl1].sub.push(item);
          } else {
            if (this.depts[lvl1].sub[lvl2])
              this.depts[lvl1].sub[lvl2].sub.push(item);
            else
              this.depts[lvl1].sub.push(item);
          }
        }
      })
      .catch(err => console.error(err));
  }
  selecteDept() {
    if(this.deptId)
      this.resource.getDeptUser(this.deptId, this.orgId, false)
      .then((_:any)=> {this.members = _; this.members.forEach(element => { element.compare = element.role_answer}); })
      .catch(err => console.error(err));
  }

  searchOfficial() { 
    if(this.search.length == 0) {
      alert('검색어를 입력해주세요.');
      return ;
    }
    this.resource.getOfficial(this.search)
    .then((_:any)=> {this.members = _; this.members.forEach(element => { element.compare = element.role_answer});})
    .catch(err => console.error(err));
  }

  syncPerson() {
    if(confirm("온나라 조직정보를 이용하여 동기화를 진행합니다. 계속하시겠습니까?")) {
      alert('동기화 중 입니다. 잠시만 기다려주세요.');
      this.common.user.syncUser({org_no:this.orgId})
      .subscribe(
        data => {
          alert('동기화되었습니다.');
          this.selecteDept();
        },
        error => {
          alert('동기화 오류.');
        }
      );
    }
  }

  syncDept() {
    if(confirm("온나라 조직정보를 이용하여 동기화를 진행합니다. 계속하시겠습니까?")) {
      this.common.user.syncDept({org_no:this.orgId})
      .subscribe(
        data => {
          alert('동기화되었습니다.');
          // this.setOrg(this.org);
        },
        error => {
          alert('동기화 오류.');
        }
      );
    }
  }
  orgDesignate(){
    let designateUsers:any = this.members.filter(_=> _.role_answer != _.compare)
    try {
      designateUsers.forEach(async(element) => {
        await this.common.user.designateUser(element).toPromise()
      });
      alert('저장되었습니다.');
    } catch (error) {
      alert('오류가 발생했습니다. 잠시후 다시시도해주세요.');
    }
  }
}
