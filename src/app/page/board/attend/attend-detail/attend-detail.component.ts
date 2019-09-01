import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocietyProvider } from '../../../../providers/society';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PushProvider } from '../../../../providers/push';
import * as FileSaver from 'file-saver';
import { TB_COL_BACK_COLOR, TB_BORDER_COLOR, MaxPageSize } from '../../../../../config';
import {Location} from '@angular/common';

@Component({
  selector: 'itsm-attend-detail',
  templateUrl: './attend-detail.component.html',
  styleUrls: ['./attend-detail.component.scss']
})
export class AttendDetailComponent implements OnInit {
  postInfo:any = {};
  userList:any = [];
  userDetail:any = {};
  total:number = 0;
  totalPage:number = 0;
  page = 1;
  pageSize = 10;
  maxPage:number = MaxPageSize;

  lectureTotal:number = 0;
  lectureTotalPage:number = 0;
  attendUserTotal:number = 0;
  attendUserTotalPage:number = 0;
  lecturePage = 1;
  lecturePageSize = 10;
  attendUserPage = 1;
  attendUserPageSize = 10;

  collectionSize:number = 10;
  attendUsercollectionSize:number = 10;
  detailSearchForm:any = {
    post_no:null,
    pageIndex:0,
    pageSize:10,
    lecturePageIndex:0,
    lecturePageSize:10
  }
  searchForm:any = {
    post_no:null,
    cls_dt:null,
    pageIndex:0,
    pageSize:10,
    join_dttm:null,
    nameOrTel:null,
    inOut:null
  };
  eventTable:any = {};
  lectureTable:any = {};
  beaconTable:any = {};
  lectureListTable:any = {};
  userTable:any = {};
  modalTable:any = {};
  findUserTable:any = {};

  in_time:any= {hour: null, minute: null};
  out_time:any = {hour: null, minute: null};
  add_or_revise:boolean = false; //add:true, revise:false
  //회원검색
  nameOrTel:string = null;
  selectedUser = null;
  constructor(private _location:Location, private route: ActivatedRoute, private router: Router, private society : SocietyProvider, private ref:ChangeDetectorRef, private modalService: NgbModal, private push:PushProvider) { }
  backClicked(){
    this._location.back();
  }
  ngOnInit() {
    this.route.queryParams.subscribe(no=>{
      if(no){
        this.searchForm.post_no = no.post_no;
        this.detailSearchForm.post_no = no.post_no;
        this.getDetail();
      }
    });
  }
  optionSelected(which){
  }

  getDetail(init=true, page = null){
    if(page) this.detailSearchForm.lecturePageIndex = page-1;
    this.society.board.post.attend.get(this.detailSearchForm)
    .subscribe((data:any)=>{ 
      this.lectureTotal = data.total;
      this.lectureTotalPage = Math.ceil(this.lectureTotal/this.lecturePageSize);
      this.collectionSize = this.lectureTotalPage * 10;
      this.postInfo = data.list[0];
      this.setTable();
      if(init && this.postInfo.board_typ == '2'){
        this.getUser();//모든 신청 접수자 조회
      }
      this.ref.detectChanges();
    })
  }
  getUser(page = null, row = null){
    if(row){
      for(let item of row)
        if(item.key) this.userDetail[item.key] = item.value;
    }
    this.searchForm.cls_dt = this.userDetail.cls_dt;
    this.userTable = {};
    if(page) this.searchForm.pageIndex = page-1;
    this.society.board.post.attend.getUser(this.searchForm)
    .subscribe((data:any)=>{
      this.attendUserTotal = data.total;
      this.attendUserTotalPage = Math.ceil(this.attendUserTotal/this.attendUserPageSize);
      // this.total = data.total;
      // this.totalPage = Math.ceil(this.total/this.pageSize);
      this.attendUsercollectionSize = this.attendUserTotalPage * 10;
      this.userList = data.list;
      this.setUserTable();
      this.ref.detectChanges();
    })
  }
  getSelectedUser(row){
    for(let item of row) this.userDetail[item.key] = item.value;
    this.selectedUser = this.userDetail.value;
  }
  postUser(){
    if(this.in_time.hour)
      this.userDetail.in_dttm = this.userDetail.in_dttm.split(' ')[0] + ' ' + this.in_time.hour + ':' + this.in_time.minute;
      
    if(this.out_time.hour)
      this.userDetail.out_dttm = this.userDetail.out_dttm.split(' ')[0] + ' ' + this.out_time.hour + ':' + this.out_time.minute;

    this.society.board.post.attend.postUser(this.userDetail)
    .subscribe(_=>{
      this.getUser(this.page);
      alert('저장 성공');
    },err=>{
      alert('저장 실패');
    })
  }
  findUser(){
    if(this.nameOrTel && this.nameOrTel != ''){
      this.society.board.post.attend.findUser(this.nameOrTel)
      .subscribe((_:any)=>{
        this.findUserTable.rows = _.map(_=>{
          return [
            {key:'user_no', value:_.user_no, hidden:true},
            {key:'user_nm', value:_.user_nm, align:'center'},
            {key:'cp_no', value:_.cp_no, align:'center'}
          ]
        });
      },err=>{
        console.error(err);
      })
    }    
  }
  setTable(){
    if(this.postInfo.board_typ == '2'){
      this.eventTable = {
        attr:{
          col_back_color:TB_COL_BACK_COLOR,
          border_color:TB_BORDER_COLOR,
          border_yn:true, 
          table_dir:'row'
        },
        cols:[
            {value:1,width:'20%'},{value:2,width:'30%'},{value:3,width:'20%'},{value:4,width:'30%'}
        ],
        rows:[
            [{ value:'제목',          typ:'label',    auth:'read only'},{ value:this.postInfo.subj,           typ:'text',    auth:'read only'}],
            [{ value:'행사일시',       typ:'label',    auth:'read only'},{ value:this.postInfo.start_dt?this.postInfo.start_dt+' ~ '+this.postInfo.end_dt:'',
                                                                          typ:'text',    auth:'read only'}]
          ]
      };
    }else{
      this.lectureTable = {
        attr:{
          col_back_color:TB_COL_BACK_COLOR,
          border_color:TB_BORDER_COLOR,
          border_yn:true, 
          table_dir:'row'
        },
        cols:[
            {value:1,width:'20%'},{value:2,width:'30%'},{value:3,width:'20%'},{value:4,width:'30%'}
        ],
        rows:[
          [{ value:'교육·강좌 명',      typ:'label',    auth:'read only'},{ value:this.postInfo.subj,       typ:'text',    auth:'read only'}]
        ]
      };
      this.lectureListTable = {
        attr:{
          col_back_color:TB_COL_BACK_COLOR,
          border_color:TB_BORDER_COLOR,
          border_yn:true,
          table_dir:'col' //col:컬럼명 제일 위에 row:컬럼명 왼쪽에
        },
        cols:[
          {value:'교육·강좌 일자', width:'25%', align:'center'},
          {value:'교육·강좌 시간', width:'25%'},
          {value:'입장허용시간', width:'25%'},
          {value:'퇴장허용시간', width:'25%'}
        ],
        rows:this.postInfo.lectures.map(_=>{
          return [
            {key:'cls_str_tm', value:_.cls_str_tm, hidden:true},
            {key:'cls_end_tm', value:_.cls_end_tm, hidden:true},
            {key:'in_str_tm', value:_.in_str_tm, hidden:true},
            {key:'in_end_tm', value:_.in_end_tm, hidden:true},
            {key:'out_str_tm', value:_.out_str_tm, hidden:true},
            {key:'out_end_tm', value:_.out_end_tm, hidden:true},
            {key:'cls_dt', value:_.cls_dt},
            {key:'cls_str_cls_end', value:_.cls_str_tm+' ~ '+_.cls_end_tm},
            {key:'in_str_in_end', value:_.in_str_tm+' ~ '+_.in_end_tm},
            {key:'out_str_out_end', value:_.out_str_tm+' ~ '+_.out_end_tm}
          ]
        })
      }
    }
    this.beaconTable = {
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true,
        table_dir:'col' //col:컬럼명 제일 위에 row:컬럼명 왼쪽에
      },
      cols:[
        {value:'단말번호', width:'20%', align:'center'},
        {value:'uuid', width:'40%'},
        {value:'맥어드레스', width:'40%'}
      ],
      rows:this.postInfo.beacons.map(_=>{
        return [
          {key:'beacon_no', value:_.beacon_no, align:'center'}, 
          {key:'uuid', value:_.uuid, align:'center'},
          {key:'mac_addr', value:_.mac_addr, align:'center'}
        ]
      })
    }
    this.findUserTable = {
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true,
        table_dir:'col' //col:컬럼명 제일 위에 row:컬럼명 왼쪽에
      },
      cols:[
        {value:'이름', width:'40%', align:'center'},
        {value:'휴대전화', width:'60%'},
      ],
      rows:[]
    }
  }
  setUserTable(){
    this.userTable = {
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true,
        table_dir:'col' //col:컬럼명 제일 위에 row:컬럼명 왼쪽에
      },
      cols:[],
      rows:[]
    }
    if(this.postInfo.board_typ == '2'){
      this.userTable.cols=[
        {value:'이름', width:'20%', align:'center'},
        {value:'휴대전화', width:'40%'},
        {value:'참가일시', width:'40%'}
      ];
      this.userTable.rows = this.userList.map(_=>{
        return [
          {value:_.user_nm }, 
          {value:_.cp_no },
          {value:_.join_dttm }
        ]
      });
    }else{
      this.userTable.cols = [
        {value:'이름', width:'12%', align:'center'},
        {value:'휴대전화', width:'18%'},
        {value:'입장일시', width:'30%'},
        {value:'퇴장일시', width:'30%'}
      ];
      this.userTable.rows = this.userList.map(_=>{
        return [
          {key:'user_no', value:_.user_no, hidden:true },
          {key:'post_no', value:_.post_no, hidden:true},
          {key:'cls_dt', value:_.cls_dt, hidden:true},
          {key:'user_nm', value:_.user_nm }, 
          {key:'cp_no', value:_.cp_no },
          {key:'in_dttm', value:_.in_dttm },
          {key:'out_dttm', value:_.out_dttm }
        ]
      });
    }
  }
  openAttendDetailModal(content, row:any = null, add = false){
    if(row) for(let item of row) this.userDetail[item.key] = item.value;
    else {
      this.userDetail.user_no = this.userDetail.user_nm = this.userDetail.cp_no = this.userDetail.in_dttm = this.userDetail.out_dttm = null;
      this.in_time = {hour:null, minute:null};
      this.out_time = {hour:null, minute:null};
    }
    this.add_or_revise = add;
    if(this.userDetail.in_dttm){
      let in_dttm = this.userDetail.in_dttm.split(' ')[1].split(':');
      this.in_time = {hour:parseInt(in_dttm[0]), minute:parseInt(in_dttm[1])};
    }

    if(this.userDetail.out_dttm){
      let out_dttm = this.userDetail.out_dttm.split(' ')[1].split(':');
      this.out_time = {hour:parseInt(out_dttm[0]), minute:parseInt(out_dttm[1])};
    }
    
    this.modalTable = {
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true, 
        table_dir:'row'
      },
      cols:[
          {value:1,width:'20%'},{value:2,width:'30%'},{value:3,width:'20%'},{value:4,width:'30%'}
      ],
      rows:[
          [{ value:'교육·강좌명', typ:'label',    auth:'read only'},{ value:this.postInfo.subj,           typ:'text',    auth:'read only'}],
          [{ value:'교육일시',    typ:'label',    auth:'read only'},{ value:this.userDetail.cls_dt + ' ' + this.userDetail.cls_str_tm + ' ~ ' + this.userDetail.cls_end_tm,
                                                                      typ:'text',    auth:'read only'}],
          [{ value:'입장허용',    typ:'label',    auth:'read only'},{ value:this.userDetail.in_str_tm + ' ~ ' + this.userDetail.in_end_tm, 
                                                                      typ:'text',    auth:'read only'},
           { value:'퇴장허용',    typ:'label',    auth:'read only'},{ value:this.userDetail.out_str_tm + ' ~ ' + this.userDetail.out_end_tm,           
                                                                      typ:'text',    auth:'read only'}]
        ]
    }
    this.openModal(content, 'lg');
  }
  openFindUserModal(content){
    this.openModal(content);
  }
  openModal(content, size = null){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:size}).result.then((result) => {
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
    this.society.board.post.attend.getExcel(this.postInfo.post_no)
    .subscribe((_:any)=>{
      var blob = new Blob([_.blob()], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      var filename = '';
      if(this.postInfo.board_typ == '2')
        filename = `참여자목록.xlsx`;
      else
        filename = `출결내역.xlsx`;
      FileSaver.saveAs(blob, filename);
      console.log('엑셀 저장 성공');
    },err=>{
      console.error(err);
      alert('엑셀저장 실패');
    })
  }
}
