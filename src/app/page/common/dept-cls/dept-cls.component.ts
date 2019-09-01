import { Component, OnInit } from '@angular/core';
import { SocietyProvider } from '../../../providers/society';
import { ResourceService } from '../../../services/resource.service';
import { LoginSession } from '../../../services/login.session';
import * as _ from 'lodash';

@Component({
  selector: 'app-dept-cls',
  templateUrl: './dept-cls.component.html',
  styleUrls: ['./dept-cls.component.scss']
})
export class DeptClsComponent implements OnInit {
  cls:any;
  orgs:any;
  org:number = 1;
  selected_cls:string;
  depts:any;
  clsDepts:any = [];
  r_selectedList = [];
  constructor(private society : SocietyProvider, private resource:ResourceService, public session: LoginSession) { }

  ngOnInit() {
    this.society.getCls()
    .subscribe(_=>{
      this.cls = _;
      this.cls[0].clicked = true;
      this.selected_cls = this.cls[0].society_cls;
      this.getClsDept();
    });
    this.resource.getOrg(4)
      .then(_ => this.orgs = _);
    this.org = this.session.checkAdminAndGetOrg() == -1 ? 1 : this.session.checkAdminAndGetOrg();
    this.setOrg(this.org);
  }
  clsClicked(item){
    this.cls.map(_=>_.clicked=false);
    item.clicked=true;
    this.selected_cls = item.society_cls;
    this.getClsDept();
  }
  getClsDept(society_cls = this.selected_cls){
    this.society.getClsDept(society_cls)
    .subscribe((deptList:[{}])=>{
      this.clsDepts[''+society_cls] = deptList;
    });
  }
  setOrg(org = 1) {
    this.resource.getDept(org, '')
      .then((_: any) => {
        let lvl1, lvl2;
        this.depts = [];
        for (let row of _) {
          if(row.name=='시장' || row.name=='부시장' || row.name=='정무특보') continue;
          let item: any = {
            id: row.id,
            orgNo: row.orgNo,
            name: row.name,
            selected: false,
            expanded: false,
            sub: []
          };
          //lvl 2까지만
          if (row.lvl == 1) {
            lvl1 = this.depts.length;
            this.depts.push(item);
          } else if (row.lvl == 2) {
            lvl2 = this.depts[lvl1].sub.length;
            this.depts[lvl1].sub.push(item);
          } 
          // else {
          //   if (this.depts[lvl1].sub[lvl2])
          //     this.depts[lvl1].sub[lvl2].sub.push(item);
          //   else
          //     this.depts[lvl1].sub.push(item);
          // }
        }
      })
      .catch(err => console.error(err));
  }
  getSelectedDept(dept){
    let flag = false;
    let idx = 0;
    this.r_selectedList.forEach((_,index)=>{
      if(dept.id == _.id) {
        flag = true;
        idx = index;
      }
    });
    if(!flag && dept.selected) this.r_selectedList.push(dept);
    else if(flag && !dept.selected) this.r_selectedList.splice(idx, 1);
  }
  add(){
    let temp = [];
    for(let right of this.r_selectedList){
      let flag = false;
      for(let left of this.clsDepts[this.selected_cls]){
        if(right.orgNo == left.org_no && right.id == left.dept_id) flag = true;
      }
      if(!flag){
        this.clsDepts[this.selected_cls].push({org_no:right.orgNo, dept_id:right.id, dept_nm:right.name});
      }
    }
  }
  remove(){
    this.clsDepts[this.selected_cls] = this.clsDepts[this.selected_cls].filter(_=>!_.selected);
  }
  save(){
    this.society.postClsDept({
      society_cls:this.selected_cls,
      depts:this.clsDepts[this.selected_cls].filter(_=>_.org_no==this.org),
      org_no:this.org
    })
    .subscribe(_=>{
      alert('저장성공');
    },
    err=>{
      alert('저장실패')
      console.error(err);
    })
  }
}
