import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocietyProvider } from '../../../../providers/society';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { TB_COL_BACK_COLOR, TB_BORDER_COLOR } from '../../../../../config';
import * as FileSaver from 'file-saver';
import {Location} from '@angular/common';
@Component({
  selector: 'itsm-survey-result',
  templateUrl: './survey-result.component.html',
  styleUrls: ['./survey-result.component.scss']
})
export class SurveyResultComponent implements OnInit {
  survey_no:number = null;
  surveyDetail:any = {};
  surveyItem:any = [];
  table: any = [];
  constructor(private _location:Location, private society : SocietyProvider, private ref:ChangeDetectorRef, private modalService:NgbModal, private route: ActivatedRoute, private router: Router) { }
  backClicked(){
    this._location.back();
  }
  ngOnInit() {
    this.route.queryParams.subscribe(no=>{
      if(no){
        this.survey_no = no.survey_no;
        this.getSurveyDetail(this.survey_no);
      }
    });
  }
  getSurveyDetail(survey_no){
    this.society.board.post.survey.getSurveyResult(survey_no)
    .subscribe((data:any)=>{
      this.surveyDetail = data.surveyDetail;
      this.surveyItem = data.surveyItem;
      this.setTable();
    })
  }
  getSurveyDetailExcel(survey_no = this.survey_no){
    this.society.board.post.survey.getSurveyResultExcel(survey_no)
    .subscribe((_:any)=>{
      var blob = new Blob([_], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      var filename = `설문답변내역.xlsx`;
      FileSaver.saveAs(blob, filename);
      console.log('엑셀 저장 성공');
    },
    err=>{
      alert('엑셀 저장 실패');
    })
  }
  setTable(){
    this.table = {
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
        [{ value:'설문제목',      typ:'label',    auth:'read only'},{ value:this.surveyDetail.survey_subj,       typ:'text',    auth:'read only'}],
        [{ value:'설문취지',      typ:'label',    auth:'read only'},{ value:this.surveyDetail.survey_txt,        typ:'html',    auth:'read only'}],
  
        [{ value:'조사기간',      typ:'label',    auth:'read only'},{ value:this.surveyDetail.start_dttm?this.surveyDetail.start_dttm+' ~ '+this.surveyDetail.close_dttm:'',
                                                                                                          typ:'text',    auth:'read only'},
        { value:'진행상태',       typ:'label',    auth:'read only'},{ value:this.surveyDetail.state_nm,    typ:'text',    auth:'read only'}],
  
        [{ value:'설문참여대상',  typ:'label',    auth:'read only'},{ value:this.surveyDetail.survey_target_nm,typ:'text',    auth:'read only'},
        { value:'답변자수',       typ:'label',    auth:'read only'},{ value:this.surveyDetail.join_cnt,     typ:'text',    auth:'read only', data_typ:'number'}],
  
        [{ value:'설문등록자',    typ:'label',    auth:'read only'},{ value:this.surveyDetail.reg_user_nm,  typ:'text',    auth:'read only'},
        { value:'등록일시',       typ:'label',    auth:'read only'},{ value:this.surveyDetail.reg_dttm,     typ:'text',    auth:'read only'}]
      ]
    }
  }
}
