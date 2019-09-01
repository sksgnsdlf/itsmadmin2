import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { SocietyProvider } from '../../../providers/society';
import * as _ from 'lodash';
import { SocietyGroupSearchForm } from '../../../../config';
import { isNumber } from 'util';
import Chart from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { LoginSession } from '../../../services/login.session';

@Component({
  selector: 'app-group-stat',
  templateUrl: './group-stat.component.html',
  styleUrls: ['./group-stat.component.scss']
})
export class GroupStatComponent implements OnInit {
  // @ViewChild("noDataChart") noDataChart: Chart;
  @ViewChild(BaseChartDirective) noDataChart: BaseChartDirective;


  today = new Date();
  options: any = {};
  searchForm: SocietyGroupSearchForm = {
    district_cd: null,
    society_cls: null,
  }

  //상단 차트 
  periodData: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: '공지' }, { data: [0, 0, 0, 0, 0, 0, 0], label: '행사안내' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: '교육강좌' }, { data: [0, 0, 0, 0, 0, 0, 0], label: '모집' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: '설문조사' }, { data: [0, 0, 0, 0, 0, 0, 0], label: '상품안내' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: '시설공간안내' }, { data: [0, 0, 0, 0, 0, 0, 0], label: '묻고답하기' }
  ];
  periodLabels: Array<any> = ['01-01', '01-02', '01-03', '01-04', '01-05', '01-06', '01-07'];

  boardLabels: string[] = ["공지", "행사안내", "교육강좌", "모집", "설문조사", "상품안내", "시설공간안내", "묻고답하기"];
  boardData: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

  clsLabels: string[] = ["교육", "복지", "문화", "체육", "환경", "여행", "도서", "건강", "육아", "민간"];
  clsData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //하단 차트 condition => _c
  periodData_c: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: '공지' }, { data: [0, 0, 0, 0, 0, 0, 0], label: '행사안내' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: '교육강좌' }, { data: [0, 0, 0, 0, 0, 0, 0], label: '모집' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: '설문조사' }, { data: [0, 0, 0, 0, 0, 0, 0], label: '상품안내' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: '시설공간안내' }, { data: [0, 0, 0, 0, 0, 0, 0], label: '묻고답하기' }
  ];
  boardLabels_c: string[] = ["공지", "행사안내", "교육강좌", "모집", "설문조사", "상품안내", "시설공간안내", "묻고답하기"];
  boardData_c: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  clsLabels_c: string[] = ["교육", "복지", "문화", "체육", "환경", "여행", "도서", "건강", "육아", "민간"];
  clsData_c: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  noDataBoard: boolean = true;
  noDataCls: boolean = true;
  noData: number[] = [100];


  canvasCls: any;
  ctxCls: any;
  clsChart: any;
  canvasBoard: any;
  ctxBoard: any;
  boardChart: any;
  noDataOptions = {
    type: 'doughnut',
    data: {
      labels: ['데이터가 없습니다'],
      datasets: [{
        data: [100],
        backgroundColor: ['#90a4ae'],
      }]
    }
  };

  constructor(private society: SocietyProvider, public ref: ChangeDetectorRef, private auth: LoginSession) { }

  ngOnInit() {

    this.periodLabels = [
      new Date(this.today.getTime() - (6 * 24 * 60 * 60 * 1000)).toISOString().slice(5, 10),
      new Date(this.today.getTime() - (5 * 24 * 60 * 60 * 1000)).toISOString().slice(5, 10),
      new Date(this.today.getTime() - (4 * 24 * 60 * 60 * 1000)).toISOString().slice(5, 10),
      new Date(this.today.getTime() - (3 * 24 * 60 * 60 * 1000)).toISOString().slice(5, 10),
      new Date(this.today.getTime() - (2 * 24 * 60 * 60 * 1000)).toISOString().slice(5, 10),
      new Date(this.today.getTime() - (1 * 24 * 60 * 60 * 1000)).toISOString().slice(5, 10),
      new Date(this.today.getTime()).toISOString().slice(5, 10),
    ];

    this.society.getOptions()
      .subscribe(data => {
        this.options = data;
        
      });
    this.getPeriod()
      .subscribe(data => {
        this.periodData = [];
        for (let key in data) {
          this.periodData.push({ label: key, data: data[key] });
        }
        this.ref.detectChanges();
      });
    this.getCls()
      .subscribe((data: any) => {
        this.clsData = _.values(data);
        this.clsLabels = _.keys(data);
        this.ref.detectChanges();
      });
    this.getboard()
      .subscribe((data: any) => {
        this.boardData = data.data;
        this.boardLabels = data.label;
        this.ref.detectChanges();
      });
    this.adjustNoDataChart();
    if (this.auth.profile.user_role == "3") {
      this.society.getUserInfo()
        .subscribe((data: any) => {
          if (data && data.district_cd)
            this.searchForm.district_cd = data.district_cd;
          if (data && data.society_cls)
            this.searchForm.society_cls = data.society_cls;
          if (this.searchForm.district_cd || this.searchForm.society_cls)
            this.getConditionCharts();
          this.ref.detectChanges();
        });
    }
  }

  getPeriod() {
    return this.society.getStatPeriod(this.searchForm);
  }
  getCls() {
    return this.society.getStatCls(this.searchForm);
  }
  getboard() {
    return this.society.getStatBoard(this.searchForm);
  }

  getConditionCharts() {
    // if (!isNumber(this.searchForm.district_cd) || !isNumber(this.searchForm.society_cls)) {
    //   alert('단체분류와 행정구역 중 하나를 선택하세요');
    //   return;
    // }
    this.getPeriod()
      .subscribe(data => {
        this.periodData_c = [];
        for (let key in data) {
          this.periodData_c.push({ label: key, data: data[key] });
        }
        this.ref.detectChanges();
      });
    this.getCls()
      .subscribe((data: any) => {
        this.clsData_c = _.values(data);
        this.noDataCls = false;
        if (_.isEqual(this.clsData_c, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])) {
          this.noDataCls = true;
          this.clsChart.destroy();
          this.clsChart = new Chart(this.ctxCls, this.noDataOptions);
        }
        this.ref.detectChanges();
      });
    this.getboard()
      .subscribe((data: any) => {
        this.boardData_c = data.data;
        this.noDataBoard = false;
        if (_.isEqual(this.boardData_c, [0, 0, 0, 0, 0, 0, 0, 0])) {
          this.noData = [400];
          this.noDataBoard = true;
          this.boardChart.destroy();
          this.boardChart = new Chart(this.ctxBoard, this.noDataOptions);
        }
        this.ref.detectChanges();
      });

  }

  adjustNoDataChart() {
    this.canvasCls = document.getElementById('clsChart');
    this.ctxCls = this.canvasCls.getContext('2d');
    this.clsChart = new Chart(this.ctxCls, this.noDataOptions);
    this.canvasBoard = document.getElementById('boardChart');
    this.ctxBoard = this.canvasBoard.getContext('2d');
    this.boardChart = new Chart(this.ctxBoard, this.noDataOptions);
  }

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
}