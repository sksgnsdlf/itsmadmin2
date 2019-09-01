import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MaxPageSize, TB_COL_BACK_COLOR, TB_BORDER_COLOR } from '../../../../config';
import { SocietyProvider } from '../../../providers/society';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-qna',
  templateUrl: './qna.component.html',
  styleUrls: ['./qna.component.scss']
})
export class QnaComponent implements OnInit {
  societyList:any = [];
  qnaList:any = [];
  total:number = 0;
  totalPage:number = 0;
  page = 1;
  pageSize = 10;
  maxPage:number = MaxPageSize;
  collectionSize:number = 10;
  searchForm:any = {
    society_no:null,
    searchType:null,
    searchTxt:null,
    board_tab:null,
    fromDt:null,
    toDt:null,
    ans_yn:null,
    pageIndex:0,
    pageSize:10
  };
  option:any = {
    searchType:['제목', '내용', '제목+내용', '작성자'],//검색 항목
    ans_yn:[{cd:'1', cd_nm:'답변완료'}, {cd:'0', cd_nm:'미답변'}],
    board:[]
  }; // 검색 옵션들
  listTable:any = {};
  constructor(private ref:ChangeDetectorRef, private society : SocietyProvider,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //society list 가져오기
    this.society.get(null, 0, 0, true)
    
    .subscribe((data:any)=>{
      this.societyList = data.list;
    });
    this.initTable();
  }
  //init searchFrom
  initSearchForm(){
    this.searchForm = {
      society_no:(!this.searchForm.society_no || this.searchForm.society_no == 'null')? null : this.searchForm.society_no,
      searchType:null,
      searchTxt:null,
      board_tab:null,
      fromDt:null,
      toDt:null,
      ans_yn:null,
      pageIndex:0,
      pageSize:10
    };
  }
  //회원 검색 option 가져오기
  optionSelected(society_no){
    if(!society_no) return;
    this.searchForm.society_no = society_no;
    this.initSearchForm();
    //검색옵션 가져오기
    if(this.searchForm.society_no){
      this.society.board.qna.getOption(this.searchForm.society_no)
      .subscribe((_:any)=>{
        this.option.board = _.board;
      });
      this.searchQna();
    }
    this.ref.detectChanges();
  }

  //포스트 목록 조회
  searchQna(page=null){
    if(page) this.searchForm.pageIndex = page-1;
    this.society.board.qna.get(this.searchForm)
    
    .subscribe((data:any)=>{
      this.qnaList = data.list;
      this.total = data.total;
      this.totalPage = Math.ceil(this.total/this.pageSize);
      this.collectionSize = this.totalPage * 10;
      
      this.setTable();
      this.ref.detectChanges();
    });
  }
  goToQnaDetail(row){
    
    let type = null;
    let no = null;
    for(let item of row){
      if(item.key == 'type') type = item.value;
      if(item.key == 'no') no = item.value;
    }
    this.router.navigate(['board/qna/detail'],{ queryParams: type=='qna' ? { qa_no:no } : { post_no:no } });
  }
  initTable(){
    this.listTable={
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true,
        table_dir:'col' //col:컬럼명 제일 위에 row:컬럼명 왼쪽에
      },
      cols:[
        {value:'No.', width:'5%', align:'center'},
        {value:'게시물 제목/질문', width:'55%'},
        {value:'게시판', width:'15%'},
        {value:'등록일자', width:'15%'},
        {value:'답변/질문', width:'10%'}
      ],
      rows:[]
    }
  }
  setTable(){
    this.initTable();
    this.listTable.rows = this.qnaList.map((_,idx)=>{
        return [
          {key:'type', value:_.type, hidden:true},
          {key:'no', value:_.no, hidden:true},
          {key:'idx', value:(idx+1)+((this.page-1)*10)},
          {key:'subj', value:_.subj, align:'left'},
          {key:'board_tab_nm', value:_.board_tab_nm},
          {key:'reg_dttm', value:_.reg_dttm},
          {key:'cnt', value:_.ans_cnt+'/'+_.qst_cnt}
        ]
    })
  }
}
