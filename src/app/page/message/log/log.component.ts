import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocietyProvider } from '../../../providers/society';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginSession } from '../../../services/login.session';
import { UtilService } from '../../../services/util';
import { API } from '../../../../config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  list: any = [];
  recvs: any = [];
  total: number = 0;
  totalPage: number = 0;
  collectionSize: number = 10;
  MaxPageSize: number = 7;
  page = 1;
  searchForm: any = {
    mine: false,
    method: null,
    startDate: null,
    endDate: null,
    search: null,
    sender: null,
    pageIndex: 0,
    pageSize: 5
  };
  pushText:string = '';
  selected = 0;

  constructor(private ref: ChangeDetectorRef, private society: SocietyProvider, private route: ActivatedRoute, private router: Router, private http: HttpClient, public util: UtilService, public session: LoginSession) { }


  ngOnInit() {
    this.initSearchForm();
    this.searchPost();
  }
  //init searchFrom
  initSearchForm() {
    this.searchForm = {
      mine: false,
      method: null,
      startDate: null,
      endDate: null,
      search: null,
      sender: null,
      pageIndex: 0,
      pageSize: 5
    };
  }

  ///푸시발송내역 목록 조회
  searchPost(page = null) {
    if (page)
      this.searchForm.pageIndex = page - 1;
    let url = `${API}/push/history?offset=${this.searchForm.pageIndex * this.searchForm.pageSize}&limit=${this.searchForm.pageSize}&mine=${true}&org=${this.session.profile.org_no}`;
    if (this.searchForm.mine)
      url += `&mine=true`;
    if (this.searchForm.method && this.searchForm.method !== 'null')
      url += `&method=${this.searchForm.method}`;
    if (this.searchForm.startDate) {
      url += `&startDate=${this.util.myDateToUnix(this.searchForm.startDate)}`;
    }
    if (this.searchForm.endDate) {
      url += `&endDate=${this.util.myDateToUnix(this.searchForm.endDate)}`;
    }
    if (this.searchForm.search)
      url += `&search=${this.searchForm.search}`;
    if (this.searchForm.sender)
      url += `&sender=${this.searchForm.sender}`;

    this.http.get(url)
      
      .subscribe((_:any) => {
        this.total = _.total;
        this.totalPage = Math.ceil(this.total / this.searchForm.pageSize);
        this.collectionSize = this.totalPage * 10;
        this.list = _.list;
        if (this.list.length > 0) {
          this.selected = this.list[0].id;
          this.getRecvs(this.list[0].id);
        }
      });
  }
  cancelRevserdMsg(item) {
    this.http.delete(`${API}/push/reserved/${item.id}`)
      .subscribe(_ => {
        item.reserved = '2';
      });
  }

  getRecvs(id) {
    this.selected = id;
    this.http.get(`${API}/push/recvs/${id}`)
      
      .subscribe(_ => this.recvs = _);
  }
}
