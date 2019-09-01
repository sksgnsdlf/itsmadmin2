import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocietyProvider } from '../../../providers/society';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { MaxPageSize, TB_COL_BACK_COLOR, TB_BORDER_COLOR } from '../../../../config';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  societyList:any = [];
  surveyList:any = [];
  surveyDetail:any = {};
  total:number = 0;
  totalPage:number = 0;
  page = 1;
  pageSize = 10;
  maxPage:number = MaxPageSize;
  collectionSize:number = 10;
  searchForm:any = {
    survey_no:null,
    society_no:null,
    state:null,
    searchType:null,
    searchTxt:null,
    fromDt:null,
    toDt:null,
    pageIndex:0,
    pageSize:10
  };
  option:any = {
    searchType:['제목', '내용', '제목+내용', '작성자'],//검색 항목
    state:[]
  }; // 검색 옵션들
  listTable:any = {};
  constructor(private society : SocietyProvider, private ref:ChangeDetectorRef, private modalService:NgbModal, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.initSearchForm();
    //society list 가져오기
    this.society.get(null, 0, 0, true)
    .subscribe((data:any)=>{
      
      this.societyList = data.list;
      this.getOption();
    });
    this.setTable();
  }
  //init searchFrom
  initSearchForm(){
    this.searchForm = {
      survey_no:null,
      society_no:(!this.searchForm.society_no || this.searchForm.society_no == 'null')? null : this.searchForm.society_no,
      state:null,
      searchType:null,
      searchTxt:null,
      fromDt:null,
      toDt:null,
      pageIndex:0,
      pageSize:10
    };
  }
  //society 선택
  optionSelected(society_no){
    if(!society_no) return;
    this.searchForm.society_no = society_no;
    this.initSearchForm()
    this.getSurveyList();    
  }
  //검색 옵션 가져오기
  getOption(){
    this.society.board.post.survey.getSurveyOption()
    .subscribe((_:any)=>{
      this.option.state = _.state;
    });
  }
  getSurveyList(page:number = null){
    if(page) this.searchForm.pageIndex = page - 1;
    this.society.board.post.survey.getSurveyList(this.searchForm)
    .subscribe((data:any)=>{
      this.surveyList = data.list;
      this.total = data.total;
      this.totalPage = Math.ceil(this.total/this.pageSize);
      this.collectionSize = this.totalPage * 10;
      this.ref.detectChanges();
      this.setTable();
    })
  }
  setTable(){
    this.listTable={
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true,
        table_dir:'col' //col:컬럼명 제일 위에 row:컬럼명 왼쪽에
      },
      cols:[
        { value:'No.', width:'5%', align:'center'},
        { value:'설문제목', width:'40%', align:'center'},
        { value:'작성자', width:'10%', align:'center'},
        { value:'등록일자', width:'15%', align:'center'},
        { value:'진행상태', width:'15%', align:'center'},
        { value:'답변자수', width:'15%', align:'center'}
      ],
      rows:this.surveyList.map((_,idx)=>{
        return [
            { key:'survey_no', value:_.survey_no, hidden:true},
            { key:'index', value:(idx+1)+((this.page-1)*10)},
            { key:'survey_subj', value:_.survey_subj, align:'left'},
            { key:'reg_user_nm', value:_.reg_user_nm},
            { key:'reg_dttm', value:_.reg_dttm},
            { key:'state_nm', value:_.state_nm},
            { key:'join_cnt', value:_.join_cnt}

        ]
      })
    }
  }
  gotoResultPage(row){
    let survey_no = null;
    
    for(let item of row){
      if(item.key == 'survey_no') survey_no = item.value;
    }
    this.router.navigate(['board/survey/result'],{ queryParams: { survey_no } });
  }

}
