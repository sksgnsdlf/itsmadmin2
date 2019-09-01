import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocietyProvider } from '../../../../providers/society';
import { FIControlOptions } from '../../../../itsm-ui/public_api';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PushProvider } from '../../../../providers/push';
import { Observable, zip } from 'rxjs';
import * as FileSaver from 'file-saver';
import { MaxPageSize, TB_COL_BACK_COLOR, TB_BORDER_COLOR } from '../../../../../config';
import * as _ from 'lodash';
import {Location} from '@angular/common';

@Component({
  selector: 'itsm-appl-detail',
  templateUrl: './appl-detail.component.html',
  styleUrls: ['./appl-detail.component.scss']
})
export class ApplDetailComponent implements OnInit {
  postInfo:any = {};
  applUserList:any = [];
  total:number = 0;
  totalPage:number = 0;
  page = 1;
  pageSize = 10;
  collectionSize:number = 10;
  maxPage:number = MaxPageSize;
  checkAllUser:boolean = false;
  searchForm:any = {
    post_no:null,
    pageIndex:0,
    pageSize:10,
    searchType:null,
    searchValue:null
  };
  table:any = [];
  option:any = {
    searchType:[{cd:1,cd_nm:'신청상태'}, {cd:2,cd_nm:'선발결과'}, {cd:3,cd_nm:'결제상태'}],//검색 항목
    appl_state:[],
    select_result:[{cd:1,cd_nm:'선발'},{cd:0,cd_nm:'탈락'},{cd:2,cd_nm:'선발중'}],
    payment_state:[{cd:0,cd_nm:'결제전'},{cd:1,cd_nm:'결제'},{cd:2,cd_nm:'환불'}]
  }; // 검색 옵션들
  //추가입력 항목들 key
  keys = ['add_item1','add_item2','add_item3','add_item4','add_item5'];
  //tables
  detailTable:any = {};
  userTable:any = {};

  //modal 변수들
  applNo:number = null;
  applNoArr:number[] = [];
  applUserDetail:any = {};
  applForm:any = {};
  pushMsg:string = '[2017공공근로 신청 서비스] 선발결과통보 #성명 님은 본 신청에 #선발결과 되었습니다.';
  updApplStateForm:any = {};
  updSelectRsltForm:any = {};

  //modal itsm-ui config
  applDetailModalConfig:FIControlOptions[] = [];
  applDetailModalBtn = {};
  applModalConfig:FIControlOptions[] = [];
  applModalBtn = {};
  // sendMsgModalConfig:FIControlOptions[] = [];
  // sendMsgModalBtn = {};
  updApplStateModalConfig:FIControlOptions[] = [];
  updApplStateModalBtn = {};
  updSelectRsltModalConfig:FIControlOptions[] = [];
  updSelectRsltModalBtn = {};
  constructor(private _location:Location, private route: ActivatedRoute, private router: Router, private society : SocietyProvider, private ref:ChangeDetectorRef, private modalService: NgbModal, private push:PushProvider) { }
  backClicked(){
    this._location.back();
  }
  ngOnInit() {
    this.route.queryParams.subscribe(no=>{
      if(no){
        this.searchForm.post_no = no.post_no;
        this.society.board.post.getApplPost({post_no:no.post_no})
        .subscribe((_:any)=>{
          this.postInfo = _.list[0];
          this.setDetailTable();
          this.searchApplUser();//모든 신청 접수자 조회
          //푸시 메세지 세팅
          this.pushMsg = `[${this.postInfo.subj}] 선발결과통보 #성명 님은 본 신청에 #선발결과 되었습니다.`;
          this.society.board.post.getApplOption(null, this.postInfo.post_no)
          .subscribe((_:any)=>{
            this.option.appl_state = _.appl_state;
            this.setModalFormConfig();
          });
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
    let add_item:any = [];
    for(let key of this.keys){
      if(this.postInfo[key]) add_item.push(this.postInfo[key]);
    }
    add_item = add_item.toString();
    this.detailTable = {
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
        [{ value:'내용',          typ:'label',    auth:'read only'},{ value:this.postInfo.post_txt,       typ:'html',    auth:'read only'}],
        [{ value:'추가입력항목',      typ:'label',    auth:'read only'},{ value:add_item,       typ:'html',    auth:'read only'}],
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
    // this.userTable={
    //   attr:{
    //     col_back_color:TB_COL_BACK_COLOR,
    //     border_color:TB_BORDER_COLOR,
    //     border_yn:true,
    //     table_dir:'col' //col:컬럼명 제일 위에 row:컬럼명 왼쪽에
    //   },
    //   cols:[
    //     { value:'checkbox', width:'5%', align:'center', type:"checkbox"},
    //     { value:'신청자명', width:'15%', align:'center'},
    //     { value:'연락처', width:'15%', align:'center'},
    //     { value:'접수일시', width:'15%', align:'center'},
    //     { value:'신청수량', width:'10%', align:'center'},
    //     { value:'접수상태', width:'10%', align:'center'},
    //     { value:'선발상태', width:'10%', align:'center'},
    //     { value:'결제상태', width:'10%', align:'center'},
    //     { value:'첨부파일', width:'10%', align:'center'}
    //   ],
    //   rows:this.applUserList.map((_,idx)=>{
    //     return [
    //         { key:'post_no', value:_.post_no, hidden:true},
    //         { key:'(', value:(idx+1)+((this.page-1)*10)},
    //         { key:'subj', value:_.subj},
    //         { key:'board_tab_nm', value:_.board_tab_nm},
    //         { key:'user_nm', value:_.user_nm},
    //         { key:'reg_dttm', value:_.reg_dttm},
    //         { key:'state_nm', value:_.state_nm},
    //         { key:'appl_cnt', value:(_.appl_cnt?_.appl_cnt:0) + ' / ' + (_.max_appl_cnt?_.max_appl_cnt:'∞') }
    //     ]
    //   })
    // }
  }
  searchApplUser(page = null){
    if(page)
      this.searchForm.pageIndex = page-1;
    this.society.board.post.getApplUser(this.searchForm)
    .subscribe((data:any)=>{
      this.applUserList = data.list;
      this.total = data.total;
      this.totalPage = Math.ceil(this.total/this.pageSize);
      this.collectionSize = this.totalPage * 10;
      this.ref.detectChanges();
      this.setUserTable();
    })
  }
  selectAllUser(){
    this.checkAllUser = !this.checkAllUser;
    this.applNoArr = [];
    for(let i=0;i<this.applUserList.length;i++){
      this.applUserList[i].selected = this.checkAllUser;
      if(this.checkAllUser) this.applNoArr.push(this.applUserList[i].appl_no);
    }
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
  setApplUserDetail(data){
    this.applUserDetail = data;
  }
  //체크된 접수자 명단으로 -> applNoArr 초기화
  updSelectedAppl(){
    this.applNoArr = [];
    this.applUserList.forEach(_=>{
      if(_.selected) this.applNoArr.push(_.appl_no);
    })
  }
  updApplDetail(which){
    let body = null;
    if(which == 'all'){
      body = this.applUserDetail;
    }else if(which == 'applState'){
      body = { appl_no : this.applNoArr, appl_state : this.updApplStateForm.appl_state };
    }else if(which == 'selectRslt'){
      body = { appl_no : this.applNoArr, select_rslt : this.updSelectRsltForm.select_rslt };
    }
    this.society.board.post.putAppl(body)
    .subscribe(_=>{
      alert('변경 성공');
      this.searchApplUser();
    },err=>{
      alert('변경 실패')
    })
  }
  addApplUser(){
    this.applForm.post_no = this.postInfo.post_no;
    this.society.board.post.postApplUser(this.applForm)
    .subscribe(_=>{
      alert('추가 성공');
      this.searchApplUser();
    },err=>{
      alert('추가 실패')
    })
  }
  dltAppl(appl_no){
    this.society.board.post.deleteApplUser(appl_no)
    .subscribe(_=>{
      alert('삭제 성공');
      this.searchApplUser();
    },err=>{
      alert('삭제 실패')
    })
  }
  pushApplUser(){
    let pushUserList = _.cloneDeep(this.applUserList);
    pushUserList = pushUserList.filter(_=>_.selected);
    pushUserList = pushUserList.map(_=>{
      return {
        civil_nm : _.civil_nm, 
        user_nm: _.civil_nm,
        cp_no:_.cp_no,
        select_rslt_nm:_.select_rslt_nm
      }
    });
    let zipArr = [];
    for(let item of pushUserList){
      let msg = this.pushMsg.replace('#성명', item.civil_nm);
      msg = msg.replace('#선발결과', item.select_rslt_nm);

      let formData: FormData = new FormData();
      formData.append('title', this.postInfo.subj);
      formData.append('message', msg);
      // formData.append('sender', null);
      formData.append('method', '2');
      formData.append('society_no', this.postInfo.society_no);
      // formData.append('society_nm', this.selectedSociety.society_nm);
      formData.append('users', JSON.stringify(pushUserList)); 
      formData.append('sms', msg); 
      zipArr.push(this.push.society.post(formData));
    }
    zip(...zipArr)
    .subscribe(_=>{
      alert('전송 성공');
    },err=>{
      alert('전송 실패')
    })
  }
  //신청자 목록 엑셀 저장
  getExcel(){
    this.society.board.post.getApplUserExcel(this.postInfo.post_no)
    .subscribe((_:any)=>{
      var blob = new Blob([_], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      var filename = `신청접수자 명단.xlsx`;
      FileSaver.saveAs(blob, filename);
      console.log('엑셀 저장 성공');
    },err=>{
      console.error(err);
      alert('엑셀저장 실패');
    })
  }
  setModalFormConfig(){
    this.applDetailModalConfig = [
      {
        field: 'appl_no',
        type: 'hidden'
      },
      {
        field: 'civil_nm',
        type: 'text',
        title: '신청자명',
        required: true
      },
      {
        field: 'cp_no',
        type: 'text',
        title: '휴대전화',
        required: true
      },
      {
        field: 'receipt_dttm',
        title: '접수일시',
        type: 'text',
        readonly: true
      },
      {
        field: 'appl_cnt',
        title: '신청수량',
        type: 'number',
        defaultValue: 1,
        step: 1,
        required: true,
      },
      {
        field: 'appl_state',
        type: 'select',
        title: '접수상태',
        select: {
          emptyText: '접수상태를 선택하세요',
          options: this.option.appl_state.map((_:any)=>{ return { value:_.cd, text:_.cd_nm } })
        },
        required: true
      },
      {
        field: 'select_rslt',
        type: 'select',
        title: '선발상태',
        select: {
          emptyText: '선발상태를 선택하세요',
          options: this.option.select_result.map((_:any)=>{ return { value:_.cd, text:_.cd_nm } })
        },
        required: true
      }
    ];
    for(let key of this.keys){
      if(this.postInfo[key]){
        this.applDetailModalConfig.push({
          field: 'add_input'+key[key.length-1],
          title: this.postInfo[key],
          type: 'text'
        })
      }
    }
    this.applDetailModalBtn = { delete:'삭제', submit:'확인' }; //edit = true
    this.applModalConfig = [
      {
        field: 'civil_nm',
        title: '신청자명',
        type: 'text',
        required: true
      },
      {
        field: 'cp_no',
        type: 'text',
        title: '휴대전화',
        required: true
      },
      {
        field: 'appl_cnt',
        title: '신청수량',
        type: 'number',
        defaultValue: 1,
        step: 1,
        required: true,
      }
    ];
    this.applModalBtn = { submit:'등록' };
    // this.sendMsgModalConfig = [];
    // this.sendMsgModalBtn = { submit:'전송' };
    this.updApplStateModalConfig = [
      {
        field: 'appl_state',
        type: 'select',
        title: '접수상태',
        select: {
          emptyText: '접수상태를 선택하세요',
          options: this.option.appl_state.map((_:any)=>{ return { value:_.cd, text:_.cd_nm } })
        },
        required: true
      }
    ];
    this.updApplStateModalBtn = { submit:'변경' };
    this.updSelectRsltModalConfig = [
      {
        field: 'select_rslt',
        type: 'select',
        title: '선발상태',
        select: {
          emptyText: '선발상태를 선택하세요',
          options: this.option.select_result.map((_:any)=>{ return { value:_.cd, text:_.cd_nm } })
        },
        required: true
      }
    ];
    this.updSelectRsltModalBtn = { submit:'변경' };
  }
  downloadFile(file_url){
    window.open(file_url, '_blank');
  }
}
