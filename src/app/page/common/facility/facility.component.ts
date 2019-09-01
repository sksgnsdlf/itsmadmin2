import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonProvider } from '../../../providers/common';
import { LoginSession } from '../../../services/login.session';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss']
})
export class FacilityComponent implements OnInit {
  orgs = [];
  org;

  list = [];

  body: any = {};
  edit: number = null;

  modal: NgbModalRef;

  constructor(private common: CommonProvider, private session: LoginSession, private modalService: NgbModal) { }

  ngOnInit() {
    this.getOrgan();
  }

  open(content) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  getOrgan() {
    this.orgs = [];
    this.common.organ.get()
    .subscribe((_:any)=>{
        this.orgs = _;
        if (this.session.checkAdminAndGetOrg() != -1) {
          this.orgs = this.orgs.filter((element) => {
            return element.no == this.session.checkAdminAndGetOrg();
          });
        }

        if (this.orgs.length) {
          this.org = this.orgs[0].no;
          this.getList();
        }
      }
    );
  }

  getList() {
    this.common.facility.get(this.org)
    
    .subscribe((data:any)=>this.list=data);
  }

  save() {
    let task;
    if (this.edit)
      task = this.common.facility.put(this.body);
    else
      task = this.common.facility.post(this.body);

    task.subscribe(_=>{
      alert('저장되었습니다.');
      this.modal.close();
      this.edit = null;
      this.getList();
    }, err=>{
      alert('저장실패!');
    });
  }

  delete() {
    this.common.facility.delete({
      no: this.body.no
    })
    .subscribe(_=>{
      alert('삭제되었습니다.');
      this.modal.close();
      this.edit = null;
      this.getList();
    }, err=>{
      alert('삭제실패!');
    });
  }
}
