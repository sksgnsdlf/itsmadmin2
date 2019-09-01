import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FIControlOptions } from '../../../../itsm-ui/public_api';
import { ActivatedRoute, Router } from '@angular/router';
import { SocietyProvider } from '../../../../providers/society';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PushProvider } from '../../../../providers/push';
import { Observable, zip } from 'rxjs';
import * as FileSaver from 'file-saver';
import { MaxPageSize, TB_COL_BACK_COLOR, TB_BORDER_COLOR } from '../../../../../config';
import {Location} from '@angular/common';

@Component({
  selector: 'itsm-cs-detail',
  templateUrl: './cs-detail.component.html',
  styleUrls: ['./cs-detail.component.scss']
})
export class CSDetailComponent implements OnInit {
  postInfo:any = {};
  userList:any = [];
  applUserDetail:any = {};
  total:number = 0;
  totalPage:number = 0;
  page = 1;
  pageSize = 10;
  maxPage:number = MaxPageSize;
  collectionSize:number = 10;
  checkAllUser:boolean = false;
  searchForm:any = {
    post_no:null,
    pageIndex:0,
    pageSize:10,
    payment_state:null,
    nmOrTel:null,
    fromDt:null,
    toDt:null
  };
  table:any = [];
  option:any = {
    payment_state:['미결제','결제','환불요청','환불'],
    payment_typ:[],
  }; // 검색 옵션들
  detailTable:any = {};
  userTable:any = {};
  constructor(private _location:Location, private route: ActivatedRoute, private router: Router, private society : SocietyProvider, private ref:ChangeDetectorRef, private modalService: NgbModal, private push:PushProvider) { }
  backClicked(){
    this._location.back();
  }
  ngOnInit() {
    this.route.queryParams.subscribe(no=>{
      if(no){
        this.searchForm.post_no = no.post_no;
        this.society.board.post.cs.get({post_no:no.post_no})
        .subscribe((_:any)=>{
          this.postInfo = _.list[0];
          this.setDetailTable();
          this.setUserTable();
          this.searchBillUser();//모든 신청 접수자 조회
        });
      }
    });
  }
  optionSelected(which){
    if(which == 'searchType'){
      this.searchForm.searchValue = null;
      if(this.searchForm.searchType == 'null') this.searchForm.searchType = null;

    }else if(which == 'searchValue'){
      if(this.searchForm.searchValue == 'null') this.searchForm.searchValue = null;
    }
  }
  setDetailTable(){
    this.detailTable = {
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true, 
        table_dir:'row'
      },
      cols:[
          {value:1,width:'15%'},{value:2,width:'35%'},{value:3,width:'15%'},{value:4,width:'35%'}
      ],
      rows:[
        [{ value:'제목',          typ:'label',    auth:'read only'},{ value:this.postInfo.subj,           typ:'text',    auth:'read only'}],
    
        [{ value:'작성자',      typ:'label',    auth:'read only'},{ value:this.postInfo.reg_user_nm,   typ:'text',    auth:'read only'},
        { value:'작성일시',       typ:'label',    auth:'read only'},{ value:this.postInfo.reg_dttm, typ:'text',    auth:'read only'}],
  
        [{ value:'참여대상',typ:'label',    auth:'read only'},{ value:this.postInfo.post_state_nm,  typ:'text',    auth:'read only'},
        { value:'참여자 수',       typ:'label',    auth:'read only'},{ value:this.postInfo.cnt,       typ:'text',    auth:'read only', data_typ:'number'}]
      ]
    }
  }
  setUserTable(){
    this.userTable = {
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true, 
        table_dir:'col'
      },
      cols:[
          { value:'No.', width:'5%', align:'center' },
          { value:'성명', width:'10%', align:'center' },
          { value:'휴대전화', width:'20%', align:'center' },
          { value:'평가값', width:'10%', align:'center' },
          { value:'평가일시', width:'15%', align:'center' },
          { value:'한줄의견', width:'40%', align:'center' }
      ],
      rows:this.userList.map((_,idx)=>{
        return [
          { key:'join_no', value:_.join_no, hidden:true },
          { key:'index', value:(idx+1)+((this.page-1)*10) },
          { key:'civil_nm', value:_.civil_nm },
          { key:'cp_no', value:_.cp_no },
          { key:'join_dttm', value:_.join_dttm },
          { key:'score', value:_.score },
          { key:'join_txt', value:_.join_txt }
        ]
      })
    }
  }
  setUserDetail(row){
    for(let item of row){
      this.applUserDetail[item.key] = item.value;
    }
  }
  searchBillUser(page = null){
    if(page) this.searchForm.pageIndex = page-1;
    this.society.board.post.cs.getUser(this.searchForm)
    .subscribe((data:any)=>{
      this.userList = data.list;
      this.total = data.total;
      this.totalPage = Math.ceil(this.total/this.pageSize);
      this.collectionSize = this.totalPage * 10;
      this.option.payment_typ = data.payment_typ;
      this.ref.detectChanges();
      this.setUserTable();
    })
  }
  openModal(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  //신청자 목록 엑셀 저장
  getExcel(){
    this.society.board.post.bill.getBillUserExcel(this.postInfo.post_no)
    .subscribe((_:any)=>{
      var blob = new Blob([_.blob()], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      var filename = `신청접수자 명단.xlsx`;
      FileSaver.saveAs(blob, filename);
      console.log('엑셀 저장 성공');
    },err=>{
      console.error(err);
      alert('엑셀저장 실패');
    })
  }
}
