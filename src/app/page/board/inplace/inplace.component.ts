import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocietyProvider } from '../../../providers/society';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MaxPageSize } from '../../../../config';

@Component({
  selector: 'app-inplace',
  templateUrl: './inplace.component.html',
  styleUrls: ['./inplace.component.scss']
})
export class InplaceComponent implements OnInit {
  societyList:any = [];
  inplaceList:any = [];
  inplaceDetail:any = {};
  total:number = 0;
  totalPage:number = 0;
  page = 1;
  pageSize = 10;
  maxPage:number = MaxPageSize;
  collectionSize:number = 10;
  searchForm:any = {
    society_no:null,
    state:null,
    nmOrTel:null,
    fromDt:null,
    toDt:null,
    pageIndex:0,
    pageSize:10
  };
  option = {
    state:[],
    room:[]
  };
  constructor(private society : SocietyProvider, private ref:ChangeDetectorRef, private modalService:NgbModal) { }

  ngOnInit() {
    this.initSearchForm();
  }
  //init searchFrom
  initSearchForm(){
    this.searchForm = {
      society_no:(!this.searchForm.society_no || this.searchForm.society_no == 'null')? null : this.searchForm.society_no,
      state:null,
      nmOrTel:null,
      fromDt:null,
      toDt:null,
      pageIndex:0,
      pageSize:10
    };
  }
  //검색 옵션 가져오기
  getOption(){
    if(!this.searchForm.society_no){
      alert('단체를 선택해주세요');
    }else{
      this.society.board.inplace.getInplaceOption(this.searchForm.society_no)
      .subscribe((_:any)=>{
        this.option = _;
      });
    }
  }
  //시설공간 예약 내역 가져오기
  getInplaceList(page:number = null){
    if(page) this.searchForm.pageIndex = page-1;
    this.society.board.inplace.getInplaceList(this.searchForm)
    .subscribe((data:any)=>{
      this.inplaceList = data.list;
      this.total = data.total;
      this.totalPage = Math.ceil(this.total/this.pageSize);
      this.collectionSize = this.totalPage * 10;
      this.ref.detectChanges();
    })
  }
  //society || inplace 선택
  societySelected(society_no){
    if(society_no){
      this.searchForm.society_no = society_no;
      this.getInplaceList();
      this.getOption();
    }
  }
  optionSelected(which){
    if(which == 'inplace'){
      if(this.inplaceDetail.room_no){
        this.inplaceList.forEach(_=>{
          if(_.room_no == this.inplaceDetail.room_no)
            this.inplaceDetail.base_amt = _.base_amt;
        });
        this.setInplaceDetail(this.inplaceDetail);
      }
    }
  }
  //시설 공간 신청접수 상세 정보 세팅
  setInplaceDetail(item = null){
    this.inplaceDetail = {
      rsrv_no:item?item.rsrv_no:null,
      room_no:item?item.room_no:null,
      civil_nm:item?item.civil_nm:null,
      cp_no:item?item.cp_no:null,
      state:item?item.state:null,
      appl_dttm:item?item.appl_dttm:null,
      rsrv_dt:item?item.rsrv_dt:null,
      cancel_dttm:item?item.cancel_dttm:null,
      base_amt:item?item.base_amt:null,
      pay_amt:item?item.pay_amt:null,
      approval_amt:item?item.approval_amt:null,
      rsrv_memo:item?item.rsrv_memo:null,
      memo_txt:item?item.memo_txt:null
    }
  }
  //시설 공간 신청접수정보 삭제
  deleteInplace(){
    this.society.board.inplace.deleteInplace(this.inplaceDetail.rsrv_no)
    .subscribe(_=>{
      this.getInplaceList();
      this.modalService.dismissAll();
      alert('저장 성공');
    },err=>{
      alert('저장 실패');
    });
  }
  //시설 공간 신청접수정보 저장
  saveInplaceDetail(){
    if(!this.inplaceDetail.rsrv_dt){
      alert('예약일자를 선택하세요');
      return;
    }
    this.society.board.inplace.postInplace(this.inplaceDetail)
    .subscribe(_=>{
      this.getInplaceList();
      this.modalService.dismissAll();
      alert('저장 성공');
    },err=>{
      alert('저장 실패');
    });
  }
  downloadFile(file_url){
    window.open(file_url);
  }

  openModal(content){
    if(!this.searchForm.society_no){
      alert('단체를 선택해 주세요');
      return;
    }
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

}
