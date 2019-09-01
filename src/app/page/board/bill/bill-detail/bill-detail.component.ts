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
  selector: 'itsm-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss']
})
export class BillDetailComponent implements OnInit {
  postInfo:any = {};
  applUserList:any = [];
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
        this.society.board.post.bill.getBillPost({post_no:no.post_no})
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
        [{ value:'내용',          typ:'label',    auth:'read only'},{ value:this.postInfo.post_txt,       typ:'html',    auth:'read only'}],
  
        [{ value:'진행상태',      typ:'label',    auth:'read only'},{ value:this.postInfo.state_nm,       typ:'text',    auth:'read only'},
        { value:'회원전용여부',   typ:'label',    auth:'read only'},{ value:this.postInfo.mbr_only_yn?this.postInfo.mbr_only_yn=='1'?'Y':'N':'',
                                                                                                         typ:'text',    auth:'read only'}],
  
        [{ value:'모집인원',      typ:'label',    auth:'read only'},{ value:this.postInfo.max_appl_cnt,   typ:'text',    auth:'read only', data_typ:'number'},
        { value:'접수대상',       typ:'label',    auth:'read only'},{ value:this.postInfo.cls_person_txt, typ:'text',    auth:'read only'}],
  
        [{ value:'온라인 접수기간',typ:'label',    auth:'read only'},{ value:this.postInfo.start_dttm?this.postInfo.start_dttm+' ~ '+this.postInfo.end_dttm:'',
                                                                                                          typ:'text',    auth:'read only'},
        { value:'온라인 접수정원', typ:'label',    auth:'read only'},{ value:this.postInfo.online_cnt,     typ:'text',    auth:'read only', data_typ:'number'}],
  
        [{ value:'온라인 선발방식',typ:'label',    auth:'read only'},{ value:this.postInfo.select_typ_nm,  typ:'text',    auth:'read only'},
        { value:'접수비용',       typ:'label',    auth:'read only'},{ value:this.postInfo.appl_amt,       typ:'text',    auth:'read only', data_typ:'number'}],
  
        [{ value:'인당신청제한 수',typ:'label',    auth:'read only'},{ value:this.postInfo.person_restrict_cnt,typ:'text',    auth:'read only'},
        { value:'결제방식',       typ:'label',    auth:'read only'},{ value:this.postInfo.payment_typ,     typ:'text',    auth:'read only'}]
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
          { value:'신청자명', width:'10%', align:'center' },
          { value:'연락처', width:'15%', align:'center' },
          { value:'접수비용', width:'15%', align:'center' },
          { value:'신청수량', width:'10%', align:'center' },
          { value:'결제금액', width:'15%', align:'center' },
          { value:'결제일시', width:'20%', align:'center' },
          { value:'결제상태', width:'10%', align:'center' }
      ],
      rows:this.applUserList.map((_,idx)=>{
        return [
          // { key:'appl_no', value:_.appl_no, hidden:true },
          // { key:'index', value:(idx+1)+((this.page-1)*10) },
          { key:'appl_no', value:_.appl_no },
          { key:'civil_nm', value:_.civil_nm },
          { key:'cp_no', value:_.cp_no },
          { key:'appl_amt', value:this.postInfo.appl_amt },
          { key:'appl_cnt', value:_.appl_cnt },
          { key:'total_amt', value:_.total_amt },
          { key:'payment_dttm', value:_.payment_dttm },
          { key:'payment_state', value:_.payment_state }
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
    this.society.board.post.bill.getBillUser(this.searchForm)
    .subscribe((data:any)=>{
      this.applUserList = data.list;
      this.applUserList = this.applUserList.map(_=>{
        return {
          ..._, 
          total_amt:this.postInfo.appl_amt*_.appl_cnt
        }
      });
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
