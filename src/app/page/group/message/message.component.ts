import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocietyProvider } from '../../../providers/society';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginSession } from '../../../services/login.session';
import { UtilService } from '../../../services/util';
import { API } from '../../../../config';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// import { MaxPageSize } from '../../../../config';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  societyList: any = [];
  list: any = [];
  recvs: any = [];
  total: number = 0;
  totalPage: number = 0;
  collectionSize: number = 10;
  MaxPageSize: number = 7;
  page = 1;
  searchForm: any = {
    society_no: null,
    mine: false,
    method: null,
    startDate: null,
    endDate: null,
    search: null,
    sender: null,
    pageIndex: 0,
    pageSize: 5
  };
  pushText: string = '';
  selected = 0;
  constructor(private ref: ChangeDetectorRef, private society: SocietyProvider, private route: ActivatedRoute, private router: Router, private http: HttpClient, public util: UtilService, public session: LoginSession, private modalService: NgbModal) { }

  ngOnInit() {
    //society list 가져오기
    this.society.get(null, 0, 0, true)

      .subscribe((data: any) => {
        this.societyList = data.list;
      });
  }
  //init searchFrom
  initSearchForm() {
    this.searchForm = {
      society_no: (!this.searchForm.society_no || this.searchForm.society_no == 'null') ? null : this.searchForm.society_no,
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

  optionSelected(society_no) {
    if(!society_no) return;
    this.searchForm.society_no = society_no;
    //society 선택 시 변수 세팅 및 데이터 가져오기
    this.recvs = [];
    this.initSearchForm();
    this.searchPost();
    this.ref.detectChanges();
  }

  ///푸시발송내역 목록 조회
  searchPost(page = null) {
    if (!this.searchForm.society_no) {
      alert('기관단체를 먼저 선택하세요.');
      return;
    }
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
    if (this.searchForm.society_no)
      url += `&societyNo=${this.searchForm.society_no}`;

    this.http.get(url)

      .subscribe((_: any) => {
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
  openText(content, item) {
    let closeResult;
    this.pushText = item.txt;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
      result => {
        closeResult = `Closed with: ${result}`;
      },
      reason => {
        closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
