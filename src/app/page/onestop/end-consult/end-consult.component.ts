import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ResourceService } from '../../../services/resource.service';
import { OneStopProvider } from '../../../providers/onestop';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-end-consult',
  templateUrl: './end-consult.component.html',
  styleUrls: ['./end-consult.component.scss']
})
export class EndConsultComponent implements OnInit {
  reportData: any = {
    complaint_no: ""
  };
  receipt_dttm: any;
  categoryList: Array<any> = [];
  sCategoryList: Array<any> = [];

  constructor(private resourceService: ResourceService, private oneStop: OneStopProvider, private route: ActivatedRoute, private _location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['complaint_no'] != 0) {
        this.reportData.complaint_no = +params['complaint_no']; // (+) converts string 'id' to a number
        if(!JSON.parse(localStorage.getItem('reportData')))
          this._location.back();
        else {
          this.reportData = {...JSON.parse(localStorage.getItem('reportData'))};
          localStorage.removeItem('reportData');
        }
      }
      else {
        this.reportData = JSON.parse(localStorage.getItem('reportData')) ? JSON.parse(localStorage.getItem('reportData')) : {};
        this.reportData.receipt_typ = 1;
        this.reportData.open_yn = 'Y';
        this.reportData.receipt_dttm = new Date();
        this.reportData.proc_state = "1";
        this.reportData.return_mthd = "4";
        this.reportData.receipt_mthd = "2";
        localStorage.removeItem('reportData');
      }
    });

    this.getBigCategory();
  }

  getBigCategory() {
    this.oneStop.category.get(0)
    .subscribe(
      (data:any) => {
        this.categoryList = data;
        if(this.categoryList.length > 0 && !this.reportData.up_cls_no) {
          this.reportData.up_cls_no = this.categoryList[0].id;
        }
        this.getSmallCategory();
      }
    );
  }

  getSmallCategory(categoryNo = this.reportData.up_cls_no) {
    this.oneStop.category.get(1, categoryNo)
    .subscribe(
      (data:any) => {
        this.sCategoryList = data;
        this.sCategoryList = this.sCategoryList.filter(element => {
          return element.typ == 0 || element.typ == 1;
        });
        if(this.sCategoryList.length > 0 && !this.reportData.cls_no)
          this.reportData.cls_no = this.sCategoryList[0].id;
      }
    );
  }

  textareaInput(ev, from) {
    try {
      if(from == 'req')
        this.reportData.complaints_txt = ev.target.value;
      else
        this.reportData.answer_txt = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }

  save() {
    if(!this.reportData.civil_nm || !this.reportData.civil_tel_no || !this.reportData.complaints_txt) {
      alert('성명, 전화번호, 접수내용은 필수값입니다.');
      return ;
    }
    
    var body = {...this.reportData};
    if(!body.complaint_no) {
      body.receipt_dttm = body.receipt_dttm.getTime()/1000;
      body.proc_state = "5";
    }
    else {
      body.receipt_dttm = new Date(body.receipt_dttm).getTime()/1000;
    }

    this.oneStop.post(body)
    .subscribe(
      data => {
        console.log('저장');
        alert('저장되었습니다');
        this._location.back();
      }
    );
  }

  delete() {
    this.oneStop.delete(this.reportData.complaint_no)
    .subscribe(
      data => {
        console.log('삭제완료');
        this._location.back();
      },
      error => {
        console.log('삭제실패');
      }
    );
  }
}
