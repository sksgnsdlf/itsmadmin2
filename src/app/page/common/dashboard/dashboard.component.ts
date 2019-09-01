import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { API, TB_COL_BACK_COLOR, TB_BORDER_COLOR } from '../../../../config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  members = 0;
  complainList = [];
  public joinData: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0], label: '가입 수' }
  ];
  public appData: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0], label: '앱 실행 수' }
  ];
  public cmplData: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0], label: '불편 신고 수' },
    { data: [0, 0, 0, 0, 0, 0], label: '불편 신고 처리 수' }
  ];

  today = new Date();

  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86,1)'
    },
    {
      backgroundColor: 'rgba(75, 192, 192,0.2)',
      borderColor: 'rgba(75, 192, 192,1)'
    }];

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  pageSize = 4;

  data = {
    total: 0,
    list: []
  };
  page = 1;
  listTable: any = {};
  totalPage = 0;
  collectionSize = 0;

  constructor(private http: HttpClient, public ref: ChangeDetectorRef, public router: Router) { }

  ngOnInit() {
    this.getMems();
    this.getJoins();
    this.getApp();
    this.getCmpl();
    this.setTable();
    this.search(1);
    this.lineChartLabels = [
      new Date(this.today.getTime() - (5 * 24 * 60 * 60 * 1000)).toISOString().slice(5, 10),
      new Date(this.today.getTime() - (4 * 24 * 60 * 60 * 1000)).toISOString().slice(5, 10),
      new Date(this.today.getTime() - (3 * 24 * 60 * 60 * 1000)).toISOString().slice(5, 10),
      new Date(this.today.getTime() - (2 * 24 * 60 * 60 * 1000)).toISOString().slice(5, 10),
      new Date(this.today.getTime() - (1 * 24 * 60 * 60 * 1000)).toISOString().slice(5, 10),
      new Date(this.today.getTime()).toISOString().slice(5, 10),
    ];
    if (!this.ref['destroyed']) {
      this.ref.detectChanges();
    }
  }
  getMems() {
    let url = `${API}/dashboard/members`;
    this.http.get(url)
      .subscribe((_: any) => {
        this.members = _.members;
        this.ref.detectChanges();
      });
  }

  getJoins() {
    let url = `${API}/dashboard/joins`;
    this.http.get(url)
      .subscribe((_: any) => {
        let _lineChartData: Array<any> = new Array(1);
        _lineChartData[0] = { data: _, label: this.joinData[0].label };
        this.joinData = _lineChartData;
        this.ref.detectChanges();
      });
  }

  getApp() {
    let url = `${API}/dashboard/app`;
    this.http.get(url)
      .subscribe((_: any) => {
        let _lineChartData: Array<any> = new Array(1);
        _lineChartData[0] = { data: _, label: this.appData[0].label };
        this.appData = _lineChartData;
        this.ref.detectChanges();
      });
  }

  getCmpl() {
    let url = `${API}/dashboard/cmpl`;
    this.http.get(url)
      .subscribe((_: any) => {
        let _lineChartData: Array<any> = new Array(this.cmplData.length);
        for (let i = 0; i < this.cmplData.length; i++) {
          _lineChartData[i] = { data: new Array(this.cmplData[i].data.length), label: this.cmplData[i].label };
          for (let j = 0; j < this.cmplData[i].data.length; j++) {
            if (i == 0)
              _lineChartData[i].data[j] = _.ing[j];
            else
              _lineChartData[i].data[j] = _.complete[j];
          }
        }
        this.cmplData = _lineChartData;
        this.ref.detectChanges();
      });
  }
  setTable() {
    this.listTable = {
      attr: {
        col_back_color: TB_COL_BACK_COLOR,
        border_color: TB_BORDER_COLOR,
        border_yn: true,
        table_dir: 'col'
      },
      cols: [
        { value: 'No.', width: '4%', align: 'center' },
        { value: '접수 일시', width: '7%', align: 'center' },
        { value: '민원 내용', width: '34%', align: 'center' },
        { value: '민원인', width: '5%', align: 'center' },
        { value: '접수 구분', width: '7%', align: 'center' },
        { value: '접수 방법', width: '6%', align: 'center' },
        { value: '처리 상태', width: '5%', align: 'center' },
      ],
      rows: this.data.list.map((_, idx) => {
        return [
          { key: 'complaint_no', value: _.complaint_no, hidden: true },
          { key: 'index', value: (idx + 1) + ((this.page - 1) * this.pageSize) },
          { key: 'receipt_dttm', value: moment(_.receipt_dttm).format('YYYY-MM-DD')},
          { key: 'complaints_txt', value: _.complaints_txt, align: 'left' },
          { key: 'civil_nm', value: _.civil_nm },
          { key: 'receipt_typ_nm', value: _.receipt_typ_nm },
          { key: 'receipt_mthd_nm', value: _.receipt_mthd_nm },
          { key: 'proc_state_nm', value: _.proc_state_nm },
        ]
      })
    }
  }
  search(page = this.page) {
    this.complainList = [];
    let url = `${API}/dashboard/mycmpl?offset=${(page - 1) * this.pageSize}&limit=${this.pageSize}`;
    this.http.get(url)
      .subscribe((_: any) => {
        this.data = _;
        this.setTable();
        this.totalPage = Math.ceil(this.data.total / this.pageSize);
        this.collectionSize = this.totalPage * 10;
        this.ref.detectChanges();
      });
  }
  goDetail(item){
    let no = null;
    item.forEach(_=>{
      if(_.key == 'complaint_no') no = _.value;
    });
    this.router.navigate(['/onestop/report'],{ queryParams: { no:no }});
  }
}
