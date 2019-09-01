import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocietyProvider } from '../../../../providers/society';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TB_COL_BACK_COLOR, TB_BORDER_COLOR } from '../../../../../config';
import {Location} from '@angular/common';

@Component({
  selector: 'itsm-qna-detail',
  templateUrl: './qna-detail.component.html',
  styleUrls: ['./qna-detail.component.scss']
})
export class QnaDetailComponent implements OnInit {
  no:{
    qa_no:null,
    post_no:null
  }
  qnaList:any = {};
  qnaTable:any = null;
  ansTable:any = null;
  selectedRow:any = {};
  selectedQes:any = {};
  selectedAns:any = {};
  user_auth:string = null;
  constructor(private _location:Location, private route: ActivatedRoute, private router: Router, private society : SocietyProvider, private ref:ChangeDetectorRef, private modalService: NgbModal) { }
  backClicked(){
    this._location.back();
  }
  ngOnInit() {
    this.user_auth = localStorage.getItem('user_auth');
    this.initQnaTable();
    this.initAnsTable();
    this.route.queryParams.subscribe((no:any)=>{
      if(no){
        this.no = no;
        this.getDetail(no);
      }
    });
  }
  getDetail(no:any){
    this.society.board.qna.getDetail(no.qa_no, no.post_no)
    .subscribe(_=>{
      this.qnaList = _;
      if(this.qnaList.question){ this.setCmntTable(); this.initAnsTable()}
      else { this.setQnaTable(); this.initAnsTable()}

      if(Object.keys(this.selectedRow).length != 0 ) this.setAnsTable(this.selectedRow);
    })
  }
  initQnaTable(){
    this.qnaTable={
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true,
        table_dir:'col' //col:컬럼명 제일 위에 row:컬럼명 왼쪽에
      },
      cols:[
        {value:'No.', width:'5%', align:'center'},
        {value:'질문내용', width:'65%'},
        {value:'질문자', width:'10%'},
        {value:'질문일시', width:'13%'},
        {value:'답변유무', width:'7%'}
      ],
      rows:[]
    }
  }
  initAnsTable(){
    this.ansTable={
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true,
        table_dir:'col' //col:컬럼명 제일 위에 row:컬럼명 왼쪽에
      },
      cols:[
        {value:'답변내용', width:'70%'},
        {value:'답변자', width:'10%'},
        {value:'답변일시', width:'20%'}
      ],
      rows:[]
    }
  }
  setQnaTable(){
    this.initQnaTable();
    this.qnaTable.rows = this.qnaList.map((_,idx)=>{ 
      return [
        { key:'type', value:'qna', hidden:true },
        { key:'qa_no', value:_.qa_no, hidden:true },
        { key:'no', value:idx+1 },
        { key:'qst_txt', value:_.qst_txt },
        { key:'qst_user_nm', value:_.qst_user_nm },
        { key:'qst_upd_dttm', value:_.qst_upd_dttm },
        { key:'ans_yn', value:this.qnaList[idx].ans_txt?'Y':'N' }
      ]
    });
  }
  setCmntTable(){
    this.initQnaTable();
    this.qnaTable.rows = this.qnaList.question.map((_,idx)=>{
      return [
        { key:'type', value:'cmnt', hidden:true },
        { key:'cmnt_no', value:_.cmnt_no, hidden:true },
        { key:'no', value:idx+1 },
        { key:'cmnt_txt', value:_.cmnt_txt },
        { key:'user_nm', value:_.user_nm },
        { key:'upd_dttm', value:_.upd_dttm },
        { key:'ans_yn', value:this.qnaList.answer[idx].cmnt_no?'Y':'N' }
      ]
    })
  }
  setAnsTable(row){
    this.selectedRow = row;
    this.initAnsTable();
    let type = null;
    let idx = null;
    let cmnt_no = null;
    for(let item of row){
      if(item.key == 'type') type = item.value;
      if(item.key == 'no') idx = item.value-1;
      if(item.key == 'cmnt_no') cmnt_no = item.value;
    }
    if(type == 'qna'){
      this.selectedQes = this.qnaList[idx];
      this.selectedAns = this.qnaList[idx];
      let isEmpty = this.selectedAns.ans_txt?false:true;
      this.ansTable.rows = [
        [
          { key:'type', value:'qna', hidden:true },
          { key:'qa_no', value:this.selectedAns.qa_no, hidden:true },
          { key:'ans_txt', value:!isEmpty?this.selectedAns.ans_txt:null, type:'text' },
          { key:'ans_user_nm', value:!isEmpty?this.selectedAns.ans_user_nm:null },
          { key:'ans_upd_dttm', value:!isEmpty?this.selectedAns.ans_upd_dttm:null }
        ]
      ];
    }else{
      this.selectedQes = this.qnaList.question[idx];
      this.selectedAns = this.qnaList.answer[idx];
      let isEmpty = this.selectedAns.cmnt_no?false:true;
      this.ansTable.rows = [
        [
          { key:'type', value:'cmnt', hidden:true },
          { key:'cmnt_no', value:!isEmpty?this.selectedAns.cmnt_no:null, hidden:true },
          { key:'reply_cmnt_no', value:!isEmpty?this.selectedAns.reply_cmnt_no:cmnt_no, hidden:true},
          { key:'cmnt_txt', value:!isEmpty?this.selectedAns.cmnt_txt:null, type:'text' },
          { key:'user_nm', value:!isEmpty?this.selectedAns.user_nm:null },
          { key:'upd_dttm', value:!isEmpty?this.selectedAns.upd_dttm:null }
        ]
      ];
    }
  }
  setChangedAns(row){
    let type;
    let no;
    let txt;
    let reply_cmnt_no;
    for(let item of row){
      if(item.key == 'type') type = item.value;
      if(item.key == 'qa_no' || item.key == 'cmnt_no') no = item.value;
      if(item.key=='ans_txt' || item.key == 'cmnt_txt') txt = item.value;
      if(item.key == 'reply_cmnt_no') reply_cmnt_no = item.value;
    }
    if(type=='qna'){ // 질의응답일경우
      for(let item of this.qnaList){
        if(item.qa_no == no){
          item.ans_txt = txt;
          break;
        }
      }
    }else{ // 댓글일 경우
      if(!no){
        this.selectedAns.cmnt_txt = txt;
        this.selectedAns.reply_cmnt_no = reply_cmnt_no;
      }else{
        for(let item of this.qnaList.answer){
          if(item.cmnt_no == no){
            item.cmnt_txt = txt;
            item.reply_cmnt_no = item.reply_cmnt_no;
            break;
          }
        }
      }
    }
  }
  save(){
    if(!this.selectedAns.ans_txt && !this.selectedAns.cmnt_txt){
      alert('답변내용이 없습니다. 질문을 선택해주세요.');
      return;
    }
    this.society.board.qna.post(this.selectedAns)
    .subscribe(_=>{
      alert('답변 저장 성공');
      this.getDetail(this.no);
    },err=>{
      console.error(err);
      alert('답변 저장 실패');
    })
  }
  delete(){
    if(!this.selectedAns.ans_txt && !this.selectedAns.cmnt_txt){
      alert('답변내용이 없습니다. 질문을 선택해주세요.');
      return;
    }
    this.society.board.qna.delete(this.selectedAns)
    .subscribe(_=>{
      alert('답변 삭제 성공');
      this.getDetail(this.no);
    },err=>{
      console.error(err);
      alert('답변 삭제 실패');
    })
  }
  deleteQuestion(){
    this.society.board.qna.deleteQuestion(this.selectedQes)
    .subscribe(_=>{
      alert('질문 삭제 성공');
      this.getDetail(this.no);
    },err=>{
      console.error(err);
      alert('질문 삭제 실패');
    })
  }
}
