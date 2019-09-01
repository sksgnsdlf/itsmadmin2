import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SocietyProvider } from '../../../providers/society';
import { ChangeDetectorRef } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { SocietyGroupSearchForm, MaxPageSize, TB_COL_BACK_COLOR, TB_BORDER_COLOR } from '../../../../config';
import { CalendarComponent } from '../../../itsm-ui/public_api';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  user_auth:string = null;
  societyList : any = [];
  total:number = 0;
  totalPage:number = 0;
  page = 1;
  pageSize = 10;
  maxPageSize = MaxPageSize;
  collectionSize:number = 10;
  options : any = {};
  //검색 항목들
  searchForm :SocietyGroupSearchForm = {
    oper_state : null,
    district_cd:null,
    fromDt:null,
    toDt:null,
    society_cls:null,
    society_nm:null
  }
  listTable : any = {};
  //date 관련 변수들
  dpOpen : false;
  fromDate : any;
  toDate : any;
  stringDate : string;
  hoveredDate : NgbDate;
  constructor(private route: ActivatedRoute, private router: Router, private society : SocietyProvider, private ref: ChangeDetectorRef, calendar: NgbCalendar, private ngbFormatter : NgbDateParserFormatter) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.user_auth = localStorage.getItem('user_auth');
  }

  ngOnInit() {
    this.getList(this.page);
    this.society.getOptions()
    .subscribe(data=>{
      this.options = data;
      
    });
  }

  getList(page : number){
    this.page = page;
    this.society.get(null, this.page-1, this.pageSize, null, this.searchForm)
    .subscribe((data:any)=>{
      
      this.societyList = data.list;
      this.total = data.total;
      this.totalPage = Math.ceil(this.total/this.pageSize);
      this.collectionSize = this.totalPage * 10;
      this.setTable();
      this.ref.detectChanges();
    },err=>{
      console.error('기관단체 목록 불러오기 실패')
      console.error(err);
    });
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
        { value:'No.', width:'5%', align:'center' },
        { value:'단체명', width:'15%', align:'center' },
        { value:'분류', width:'5%', align:'center' },
        { value:'승인', width:'5%', align:'center' },
        { value:'요청/승인일자', width:'10%', align:'center' },
        { value:'행정구역', width:'10%', align:'center' },
        { value:'담당자', width:'10%', align:'center' },
        { value:'연락처', width:'10%', align:'center' },
        { value:'주소', width:'30%', align:'center' }
      ],
      rows:this.societyList.map((_,idx)=>{
        return [
            { key:'society_no', value:_.society_no, hidden:true }, 
            { key:'idx', value:(idx+1)+((this.page-1)*10), align:'center' },
            { key:'society_nm', value:_.society_nm, align:'center' },
            { key:'cls_nm', value:_.cls_nm, align:'center' },
            { key:'oper_state', value:_.oper_state_nm, align:'center' },
            { key:'reg_dttm', value:_.reg_dttm, align:'center' },
            { key:'district_nm', value:_.district_nm, align:'center' },
            { key:'reg_user_no', value:_.user_nm, align:'center' },
            { key:'tel', value:_.tel, align:'center' },
            { key:'addr1', value:_.addr1, align:'left' }
        ]
      })
    }
  }
  getSocietyNoFromRowData(row){
    let society_no = null;
    for(let item of row){
      if(item.key == 'society_no'){
        society_no = item.value;
        break;
      }
    }
    this.goto_add_group_page(society_no);
  }
  goto_add_group_page(society_no = null){
    this.router.navigate(['common/group/list/revise'],{ queryParams: { society_no } });
  }
}
