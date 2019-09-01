import { Component, OnInit } from '@angular/core';
import { FormInflaterComponent, FIControlOptions } from '../../../itsm-ui/public_api';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceService } from '../../../services/resource.service';
import { Router } from '@angular/router';
import { SocietyProvider } from '../../../providers/society';
import { TB_COL_BACK_COLOR, TB_BORDER_COLOR } from '../../../../config';
import * as _ from 'lodash';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  society_no = null;
  boardList = [];
  board_tab = null;
  board_typ = null
  post_no = null;
  searchForm: any = {
    searchType: null,
    searchTxt: null,
    fromDt: null,
    toDt: null,
    post_state: null
  };

  option: any = {
    searchType: ['제목', '내용', '제목+내용', '담당자'],//검색 항목
    state: []
  }; // 검색 옵션들

  form: FormInflaterComponent;
  state = [];
  data = {
    total: 0,
    list: []
  };
  page = 1;
  modal: NgbModalRef;
  listTable: any = {};
  pageReturn:boolean = false;
  constructor(private resource: ResourceService, private society: SocietyProvider, private modalService: NgbModal, public router: Router) {
  }

  ngAfterViewChecked(){
    if (this.society_no && this.board_typ && this.pageReturn)
    {
      this.search();
      this.pageReturn = false;
    }
  }
  ngOnInit() {
    console.log('ngOnInit')
    this.society.board.post.getboardOptions()
      .subscribe(data => {
        this.option.state = data;
      });
    this.setTable();
  }
  initSearchForm() {
    this.searchForm = {
      searchType: null,
      searchTxt: null,
      board_tab: null,
      fromDt: null,
      toDt: null,
      post_state: null
    };
  }
  societySelected(society_no) {
    if(!society_no) return;
    //해당 단체의 게시판 리스트 조회
    this.society_no = society_no;
    this.getBoard(society_no);
  }
  //해당 단체의 게시판 리스트 조회 후 게시물 조회
  getBoard(society_no) {
    this.society.board.getBoard(society_no)
      .subscribe((list: any) => {
        this.boardList = _.sortBy(list, 'disp_ord' );
        //게시물 자동 조회 
        if (this.boardList.length != 0) { // 게시판이 있을 때 
          this.board_tab = this.boardList[0].board_tab;
          this.board_typ = this.boardList[0].board_typ;
          this.search(1);
        }
      })
  }
  //탭(게시판/보드)변경 했을 때 게시물 목록 가지고 오기 
  beforeChange(event) {
    this.board_tab = this.boardList[event.nextId].board_tab;
    this.board_typ = this.boardList[event.nextId].board_typ;
    this.initSearchForm();
    this.page = 1;
    this.search(1);
  }
  //게시물 조회 
  search(page = this.page) {
    if(this.searchForm.searchTxt && !this.searchForm.searchType){
      alert('검색 항목을 선택 후 검색어를 입력해 주세요.');
      return;
    }
    if(!this.searchForm.searchTxt && this.searchForm.searchType){
      alert('검색어를 입력해 주세요.');
      return;
    }
    this.society.board.post.get(this.board_tab, this.society_no, this.board_typ, page - 1, 10, this.searchForm)
      .subscribe((data: any) => {
        this.data = data;
        this.setTable();
      });
  }
  setTable() {
    this.listTable = {
      attr: {
        col_back_color: TB_COL_BACK_COLOR,
        border_color: TB_BORDER_COLOR,
        border_yn: true,
        table_dir: 'col' //col:컬럼명 제일 위에 row:컬럼명 왼쪽에
      },
      cols: [
        { value: 'No.', width: '5%', align: 'center' },
        { value: '제목', width: '50%', align: 'center' },
        { value: '작성자', width: '10%', align: 'center' },
        { value: '등록일자', width: '15%', align: 'center' },
        { value: this.board_typ != 8 ? '상태' : '답변', width: '10%', align: 'center' },
        { value: this.board_typ != 8 ? '조회수' : '질문', width: '10%', align: 'center' }
      ],
      rows: this.data.list.map((_, idx) => {
        return [
          { key: 'post_no', value: _.post_no, hidden: true },
          { key: 'type', value: _.type, hidden: true },
          { key: 'index', value: (idx + 1) + ((this.page - 1) * 10) },
          { key: 'subj', value: _.subj, align: 'left' },
          { key: 'reg_user_nm', value: _.reg_user_nm },
          { key: 'reg_dttm', value: _.reg_dttm },
          { key: this.board_typ != 8 ? 'state_nm' : 'qst_cnt', value: this.board_typ != 8 ? _.state_nm : _.qst_cnt },
          { key: this.board_typ != 8 ? 'read_cnt' : 'ans_cnt', value: this.board_typ != 8 ? _.read_cnt == null ? 0 : _.read_cnt : _.ans_cnt }
        ]
      })
    }
  }

  getPostDetail(row) {
    let type = null;
    for (let item of row) {
      if (item.key == 'post_no') this.post_no = item.value;
      if (item.key == 'type') type = item.value;
    }
    this.open(this.society_no, this.board_tab, this.board_typ, this.post_no, type);
  }

  open(society_no = null, board_tab = null, board_typ = null, post_no = null, type = null) {
    this.pageReturn = true;
    switch (this.board_typ) {
      case 1:
      case "1":
        // {cd_cls: "940", cd: "1", cd_nm: "일반안내", cd_txt: "단순공지형 일반안내게시판"}
        this.router.navigate(['board/list/common'], { queryParams: { society_no: society_no, board_tab: board_tab, board_typ: board_typ, post_no: post_no } });
        break;
      case 2:
      case "2":
        // {cd_cls: "940", cd: "2", cd_nm: "행사안내", cd_txt: "공연,전시,축제 등의 이벤트 소식을 알리는 게시판"}
        this.router.navigate(['board/list/event'], { queryParams: { society_no: society_no, board_tab: board_tab, board_typ: board_typ, post_no: post_no } });
        break;
      case 3:
      case "3":
        // {cd_cls: "940", cd: "3", cd_nm: "교육강좌", cd_txt: "교육,강좌 수강생 모집등을 위한 게시판"}
        this.router.navigate(['board/list/lecture'], { queryParams: { society_no: society_no, board_tab: board_tab, board_typ: board_typ, post_no: post_no } });
        break;
      case 4:
      case "4":
        // {cd_cls: "940", cd: "4", cd_nm: "모집", cd_txt: "인력모집, 자료취합을 위한 게시판"}
        this.router.navigate(['board/list/recruit'], { queryParams: { society_no: society_no, board_tab: board_tab, board_typ: board_typ, post_no: post_no } });
        break;
      case 5:
      case "5":
        // {cd_cls: "940", cd: "5", cd_nm: "설문조사", cd_txt: "의견수렴, 청취를 위한 게시판"}
        this.router.navigate(['board/list/survey'], { queryParams: { society_no: society_no, board_tab: board_tab, board_typ: board_typ, post_no: post_no } });
        break;
      case 6:
      case "6":
        // {cd_cls: "940", cd: "6", cd_nm: "상품안내", cd_txt: "상품목록형으로 단순안내 게시판"}
        this.router.navigate(['board/list/prod'], { queryParams: { society_no: society_no, board_tab: board_tab, board_typ: board_typ, post_no: post_no } });
        break;
      case 7:
      case "7":
        // {cd_cls: "940", cd: "7", cd_nm: "시설공간안내", cd_txt: "시설공간 사용(예약)을 위한 게시판"}
        this.router.navigate(['board/list/space'], { queryParams: { society_no: society_no, board_tab: board_tab, board_typ: board_typ, post_no: post_no } });
        break;
      case 8:
      case "8":
        // {cd_cls: "940", cd: "8", cd_nm: "묻고답하기", cd_txt: "단체 및 게시글에 대한 문의사항 게시판"}
        this.router.navigate(['board/qna/detail'], { queryParams: type == 'qna' ? { qa_no: post_no } : { post_no: post_no } });
        break;
    }
  }




}
